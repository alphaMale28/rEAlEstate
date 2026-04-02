import jwt from "jsonwebtoken";

import { ENV } from "../lib/env.js";
import prisma from "../lib/prisma.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided!" });

    const decode = jwt.verify(token, ENV.JWT_SECRET_KEY);

    const user = await prisma.user.findUnique({
      where: { id: decode.id },
      omit: { password: true },
    });

    if (!user) return res.status(404).json({ message: "User not found!" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token!" });
  }
};
