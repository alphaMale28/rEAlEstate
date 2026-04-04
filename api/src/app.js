import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import { ENV } from "./lib/env.js";

const app = express();

const __dirname = path.resolve();

const PORT = ENV.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

if (ENV.NODE_ENV === "production") {
  console.log("PRODUCTION MODE DELECTED: Serving frontend...");
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get(/.*/, (_, res) => {
    return res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running in port", PORT);
});
