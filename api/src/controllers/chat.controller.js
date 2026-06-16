import prisma from "../lib/prisma";

export const getChats = async (req, res) => {
  const userId = req.user.id;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [userId],
        },
      },
    });
    return res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get Chats" });
  }
};

export const getChat = async (req, res) => {
  try {
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get Chat" });
  }
};

export const addChat = async (req, res) => {
  try {
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to add Chat" });
  }
};

export const readChat = async (req, res) => {
  try {
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to read Chat" });
  }
};
