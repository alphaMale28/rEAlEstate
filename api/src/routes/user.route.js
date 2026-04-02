import express from "express";

import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/:id", protectRoute, updateUser);

router.delete("/:id", protectRoute, deleteUser);

export default router;
