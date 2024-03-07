"use client";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { CodeBlock } from "./code-block";
interface Message {
  content: string;
  createdAt: Date;
  id: string;
  role: "user" | "assistant" | "system";
}
const intialMessages: Message[] = [
  {
    role: "system",
    createdAt: new Date("2024-03-03T06:22:26.949Z"),
    id: "wiwdo",
    content:
      "You are a helpful assistant designed to output proper Mdx format.",
  },
  {
    content: "Sey hellow",
    role: "user",
    createdAt: new Date("2024-03-03T06:22:31.386Z"),
    id: "A3tYCUC",
  },
  {
    id: "xV9N5Q0",
    createdAt: new Date("2024-03-03T06:22:32.978Z"),
    content: 'Did you mean to say "Say hello"?\n',
    role: "assistant",
  },
  {
    content: "write javascript code",
    role: "user",
    createdAt: new Date("2024-03-03T06:22:40.571Z"),
    id: "ivXfTzv",
  },
  {
    id: "6gpH9WH",
    createdAt: new Date("2024-03-03T06:22:42.529Z"),
    content:
      'To write JavaScript code in Mdx format, you can use triple backticks followed by the language identifier "js" for JavaScript:\n\n```js\n// Your JavaScript code goes here\nconsole.log("Hello, World!");\n```\n\nReplace the comment with your actual JavaScript code.',
    role: "assistant",
  },
  {
    content: "write a python code that generate python code",
    role: "user",
    createdAt: new Date("2024-03-03T06:23:01.581Z"),
    id: "yi4FuNz",
  },
  {
    id: "gniqbGQ",
    createdAt: new Date("2024-03-03T06:23:03.898Z"),
    content:
      'To generate Python code that generates Python code, you can use a Python script. Here is an example Python script that generates another Python script:\n\n```python\n# Creating a Python script that prints "Hello, World!"\n\nwith open(\'hello_world.py\', \'w\') as file:\n    file.write(\'print("Hello, World!")\\n\')\n\nprint("Python code that generates Python code has been created in hello_world.py")\n```\n\nWhen you run this script, it will create a new Python script named "hello_world.py" that contains the code to print "Hello, World!".',
    role: "assistant",
  },
];
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: intialMessages,
  });
  console.log(messages);
  return (
    <div className="flex flex-col w-full max-w-2xl py-24 mx-auto stretch">
      {/* <ParentComponent /> */}
      <div>
        {messages.map((m) => {
          if (m.role === "system") return;
          return (
            <>
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? "User: " : "AI: "}
                <ChatMessage key={m.id} message={m as Message} />
              </div>
            </>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
}
const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <Markdown
        children={message.content}
        remarkPlugins={[remarkGfm, remarkMath]}
        className="text-base"
        components={{
          p({ children }: any) {
            return <p className="mb-5 last:mb-0 text-gray-900">{children}</p>;
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
              <code {...rest} className={`${className} font-semibold text-sm`}>
                `${children}`
              </code>
            );
          },
        }}
      />
    </div>
  );
};
