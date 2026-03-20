import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";
import { ENV } from "../lib/env.js";

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
    //   HASH THE PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER AND SAVE TO DB

    await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXIST

    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });

    if (!user) return res.status(401).json({ message: "Invalid Cridentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordVaild = await bcrypt.compare(password, user.password);

    if (!isPasswordVaild)
      return res.status(401).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND IT TO USER

    const token = jwt.sign(
      {
        id: user.id,
      },
      ENV.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    const { password: userPassword, ...userInfo } = user;

    const age = 1000 * 60 * 60 * 24 * 7;

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = async (_, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout successful" });
};
