import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { postDetail: true },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Get Posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { postDetail: true },
    });

    return res.status(200).json(post);
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
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
      include: { postDetail: true },
    });
    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Add Post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenId = req.user.id;
  try {
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Update Post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (tokenUserId !== post.userId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Post deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Delete Post" });
  }
};
