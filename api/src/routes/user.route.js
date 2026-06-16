import express from "express";

import {
  deleteUser,
  profilePosts,
  savePost,
  updateUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/:id", protectRoute, updateUser);

router.delete("/:id", protectRoute, deleteUser);

router.post("/save", protectRoute, savePost);

router.get("/profilePosts", protectRoute, profilePosts);

export default router;
