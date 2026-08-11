import jwt from "jsonwebtoken";

import { ENV } from "../lib/env.js";

export const generateToken = (userId, res) => {
  const JWT_SECRET = ENV.JWT_SECRET_KEY;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET_KEY is not confirmed!");
  }

  const token = jwt.sign(
    {
      id: userId,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const age = 1000 * 60 * 60 * 24 * 7;

  res.cookie("jwt", token, {
    httpOnly: true,
    // sameSite: "Strict",
    sameSite: "none",
    secure: ENV.NODE_ENV === "production",
    maxAge: age,
  });

  return token;
};
