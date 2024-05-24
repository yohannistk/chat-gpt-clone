import Sidebar from "@/components/sidebar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import Chat from "@/components/chat";
import { v4 as uuidv4 } from "uuid";
import { getChats } from "@/actions";

export default async function Page() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  // await prisma.chat.deleteMany();
  const chats = await getChats(userId);
  const id = uuidv4();

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar chats={chats} />
      <main className="h-full flex-1">
        <Chat id={id} />
      </main>
    </div>
  );
}
