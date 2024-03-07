import Sidebar from "@/components/sidebar";
import Chat from "@/components/chat";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect, notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const user = auth();
  if (!user) {
    redirect("/sign-in");
  }

  const chat = await prisma.chat.findUnique({
    where: {
      id: params.id!,
    },
  });
  if (!chat) return notFound();

  const chats = await prisma.chat.findMany({
    where: {
      user_id: user.userId!,
    },
  });
  const messages = await prisma.message.findMany({
    where: {
      chat_id: params.id,
    },
  });
  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar chats={chats} />
      <main className="h-full flex-1">
        <Chat id={params.id} intialMessages={messages} />
      </main>
    </div>
  );
}
