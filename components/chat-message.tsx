import { Message } from "@/app/types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CodeBlock } from "./code-block";
import { IconOpenAI } from "./ui/icons";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

interface ChatMessageProps {
  message: Message;
}
const ChatMessage = ({ message }: ChatMessageProps) => {
  const { user } = useUser();

  return (
    <div className="flex w-full gap-3 mt-3 mb-9 items-start">
      <div
        className={cn(
          `flex items-center text-primary-foreground justify-center size-6 rounded-full`,
          message.role === "user" ? "bg-gray-400" : "bg-primary "
        )}
      >
        {message.role === "user" ? user?.username?.slice(0, 2) : <IconOpenAI />}
      </div>
      <div className="flex-1">
        <h2 className="font-semibold mb-1">
          {message.role === "user" ? "You" : "ChatGPT"}
        </h2>
        <div className="w-full overflow-x-auto">
          <Markdown
            children={message.content}
            remarkPlugins={[remarkGfm, remarkMath]}
            className="text-base"
            components={{
              p({ children }: any) {
                return (
                  <p className="mb-5 last:mb-0 text-gray-900">{children}</p>
                );
              },
              code(props: any) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");

                return match ? (
                  <CodeBlock
                    {...rest}
                    language={match[1]}
                    key={Math.random()}
                    value={String(children).replace(/\n$/, "")}
                  />
                ) : (
                  <code
                    {...rest}
                    className={`${className} font-semibold text-sm`}
                  >
                    `${children}`
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

// <Markdown
//   children={message.content}
//   remarkPlugins={[remarkGfm, remarkMath]}
//   className="text-base"
//   components={{
//     p({ children }: any) {
//       return <p className="mb-5 last:mb-0 text-gray-900">{children}</p>;
//     },
//     code(props: any) {
//       const { children, className, node, ...rest } = props;
//       const match = /language-(\w+)/.exec(className || "");

//       return match ? (
//         <CodeBlock
//           {...rest}
//           language={match[1]}
//           key={Math.random()}
//           value={String(children).replace(/\n$/, "")}
//         />
//       ) : (
//         <code {...rest} className={`${className} font-semibold text-sm`}>
//           `${children}`
//         </code>
//       );
//     },
//   }}
// />
