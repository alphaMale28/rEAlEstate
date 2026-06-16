import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addChat,
  getChat,
  getChats,
  readChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", protectRoute, getChats);
router.get("/:id", protectRoute, getChat);
router.post("/", protectRoute, addChat);
router.put("/read/:id", protectRoute, readChat);

export default router;
