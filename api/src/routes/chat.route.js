import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addChat,
  getChat,
  getChats,
  readChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getChats);
router.get("/:id", getChat);
router.post("/", addChat);
router.put("/read/:id", readChat);

export default router;
