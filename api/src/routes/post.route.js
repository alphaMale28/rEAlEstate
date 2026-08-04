import express from "express";

import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.conteoller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);

router.use(protectRoute);

router.post("/", addPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
