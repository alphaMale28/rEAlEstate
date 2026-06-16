import bcrypt from "bcrypt";

import prisma from "../lib/prisma.js";
import { generateToken } from "../utils/auth.js";

export const checkEmail = async (req, res) => {
  const { email } = req.query;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return res.json({ exists: !!user });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid Cridentials" });

    const isPasswordVaild = await bcrypt.compare(password, user.password);

    if (!isPasswordVaild)
      return res.status(401).json({ message: "Invalid Credentials" });

    generateToken(user.id, res);

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = async (_, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout successful!" });
};
