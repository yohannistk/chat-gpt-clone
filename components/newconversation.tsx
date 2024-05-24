"use client";
import { Message } from "@/app/types";
import ChatList from "@/components/chat-list";
import { useChat } from "ai/react";
import React from "react";
import ChatForm from "./chat-form";
import ChatHeader from "./chat-header";
import { generateRandomString } from "./code-block";

const intialMessages: Message[] = [
  {
    role: "system",
    createdAt: new Date("2024-03-03T06:22:26.949Z"),
    id: generateRandomString(5),
    content:
      "You are a helpful assistant designed to output proper Mdx format.",
  },
];

const NewConversation = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: intialMessages,
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
        handleSubmit={(e) => {
          handleSubmit(e, { data: { chatId: "new" } });
        }}
      />
    </div>
  );
};

export default NewConversation;
