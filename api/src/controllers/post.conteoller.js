import jwt from "jsonwebtoken";

import { ENV } from "../lib/env.js";
import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bed: parseInt(query.bed) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
      include: {
        postDetail: true,
        savedPost: true,
        user: {
          omit: {
            password: true,
          },
        },
      },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Get Posts" });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies?.jwt;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          omit: { password: true },
        },
      },
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    let isSaved = false;

    if (token) {
      try {
        const decode = jwt.verify(token, ENV.JWT_SECRET_KEY);

        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: decode.id,
            },
          },
        });

        isSaved = !!saved;
      } catch (error) {
        console.log(error.message);
      }
    }

    return res.status(200).json({ ...post, isSaved });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Get Post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.user.id;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        user: {
          connect: {
            id: tokenUserId,
          },
        },
        postDetail: {
          create: body.postDetail,
        },
      },
      // include: { postDetail: true },
    });
    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Add Post" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const tokenId = req.user.id;
  try {
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Update Post" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.user.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (tokenUserId !== post.userId) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Delete Post" });
  }
};
