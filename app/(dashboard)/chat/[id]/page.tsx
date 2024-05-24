import Sidebar from "@/components/sidebar";
import Chat from "@/components/chat";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect, notFound } from "next/navigation";
import { getChats, getMessages, getSingleChat } from "@/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const chat = await getSingleChat(params.id);
  if (!chat) return notFound();
  const chats = await getChats(userId);
  const messages = await getMessages(params.id);
  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar chats={chats} />
      <main className="h-full flex-1">
        <Chat id={params.id} intialMessages={messages} />
      </main>
    </div>
  );
}
