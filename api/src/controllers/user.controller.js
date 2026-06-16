import bcrypt from "bcrypt";

import prisma from "../lib/prisma.js";

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.user.id;

  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    const dataToUpdate = { ...inputs };

    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    if (avatar !== undefined) {
      dataToUpdate.avatar = avatar;
    }

    const updateUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    const { password: userPassword, ...rest } = updateUser;

    return res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failes to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.user.id;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    return res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).status({ message: "Failed to delete user!" });
  }
};

export const savePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });

      return res.status(200).json({ message: "Post removed from saved list" });
    }
    await prisma.savedPost.create({
      data: { userId, postId },
    });

    return res.status(200).json({ message: "Post saved successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to save Post" });
  }
};

export const profilePosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const userPosts = await prisma.post.findMany({
      where: { userId },
      include: {
        savedPost: true,
      },
    });

    const saved = await prisma.savedPost.findMany({
      where: { userId },
      include: {
        post: true,
      },
    });

    const savePosts = saved.map((item) => item.post);

    return res.status(200).json({ userPosts, savePosts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get profile Posts!" });
  }
};
