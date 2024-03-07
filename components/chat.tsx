"use client";

import ChatList from "@/components/chat-list";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { ArrowUpIcon, Share, Text } from "lucide-react";
import React from "react";
import ChatForm from "./chat-form";
import ChatHeader from "./chat-header";
import { generateRandomString } from "./code-block";
import { Message } from "@prisma/client";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

// const intialMessages: Message[] = [
//   {
//     role: "system",
//     createdAt: new Date("2024-03-03T06:22:26.949Z"),
//     id: generateRandomString(5),
//     content:
//       "You are a helpful assistant designed to output proper Mdx format.",
//   },
// ];

interface Props {
  id: string;
  intialMessages?: Message[];
}
const Chat = ({ id, intialMessages }: Props) => {
  const path = usePathname();
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: intialMessages,
      onResponse(responce) {
        if (responce.status === 401) {
          toast.error(responce.statusText);
        }
      },
      onFinish(message) {
        if (!path.includes("chat")) {
          window.history.pushState({}, "", `/chat/${id}`);
        }
      },
    });
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative w-full overflow-y-auto">
        <ChatHeader />
        <ChatList messages={messages} />
      </div>
      <ChatForm
        handleInputChange={handleInputChange}
        input={input}
        handleSubmit={(e) => handleSubmit(e, { data: { id } })}
      />
    </div>
  );
};

export default Chat;
