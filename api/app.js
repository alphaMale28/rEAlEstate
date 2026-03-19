import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoute from "./routes/auth.route.js";

const app = express();

const __dirname = path.resolve();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/auth", authRoute);

if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION MODE DETECTED: Serving frontend...");
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running in port", PORT);
});
