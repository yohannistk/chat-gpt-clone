import { Message } from "@/app/types";
import React from "react";
import ChatMessage from "./chat-message";

interface ChatMessageProps {
  messages: Message[];
}
const ChatList = (props: ChatMessageProps) => {
  return (
    <div className="max-w-3xl px-5 mx-auto">
      {props.messages.map((message) => {
        if (message.role === "system") return;
        return <ChatMessage key={message.id} message={message} />;
      })}
    </div>
  );
};

export default ChatList;
