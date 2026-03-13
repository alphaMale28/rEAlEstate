import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";

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
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) return res.status(409).json({ message: "Email already in use " });
    //   HASH THE PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER AND SAVE TO DB

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXIST

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid Cridentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordVaild = await bcrypt.compare(password, user.password);

    if (!isPasswordVaild)
      return res.status(401).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND IT TO USER

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    const age = 1000 * 60 * 60 * 24 * 7;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: age,
      })
      .status(200)
      .json({ message: "Login Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
};
