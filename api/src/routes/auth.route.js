import express from "express";

import {
  checkEmail,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/check-email", checkEmail);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;
