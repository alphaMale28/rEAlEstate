import express from "express";

import {
  checkEmail,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.get("/check-email", checkEmail);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.use(protectRoute);

router.get("/check", (req, res) => res.status(200).json(req.user));

export default router;
