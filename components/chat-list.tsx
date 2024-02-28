import { Message } from "@/app/types";
import React from "react";
import ChatMessage from "./chat-message";
import { IconOpenAI } from "./ui/icons";

interface ChatMessageProps {
  messages: Message[];
}
const ChatList = (props: ChatMessageProps) => {
  return props.messages.map((message) => {
    if (message.role === "system") return;
    return (
      //   <div key={message.id} className="whitespace-pre-wrap">
      <ChatMessage key={message.id} message={message} />
      //   </div>
    );
  });
};

export default ChatList;
