import jwt from "jsonwebtoken";

import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No taken provided!" });

    const decode = jwt.verify(token, ENV.JWT_SECRET_KEY);

    const user = await prisma.user.findUnique({
      where: { id: decode.userId },
      omit: { password: true },
    });

    if (!user) return res.status(404).json({ message: "User not found!" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token!" });
  }
};
