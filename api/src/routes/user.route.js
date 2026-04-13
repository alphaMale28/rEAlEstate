import express from "express";

import {
  deleteUser,
  savePost,
  updateUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/:id", protectRoute, updateUser);

router.delete("/:id", protectRoute, deleteUser);

router.post("/save", protectRoute, savePost);

export default router;
