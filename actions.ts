import prisma from "./lib/db";
export async function getChats(userId: string) {
  const chats = await prisma.chat.findMany({
    where: {
      user_id: userId!,
    },
    include: {
      messages: true,
    },
    s,
  });
  return chats;
}
export async function getMessages(chatId: string) {
  const messages = await prisma.message.findMany({
    where: {
      chat_id: chatId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return messages;
}
export async function getSingleChat(chatId: string) {
  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId!,
    },
  });
  return chat;
}
