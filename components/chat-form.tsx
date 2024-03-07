import { ChatRequestOptions } from "ai";
import { ArrowUpIcon } from "lucide-react";
import React from "react";

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  input: string;
}

const ChatForm = ({ handleInputChange, handleSubmit, input }: Props) => {
  return (
    <div className="w-full pt-2 dark:border-white/20 md:w-[calc(100%-.5rem)]">
      <form
        onSubmit={handleSubmit}
        className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
      >
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="flex w-full items-center">
            <div className="overflow-hidden flex flex-col w-full flex-grow relative dark:text-white rounded-2xl bg-white dark:bg-gray-800 ">
              <input
                value={input}
                onChange={handleInputChange}
                className="border p-3 px-3 resize-none rounded-2xl"
              ></input>
              <button
                type="submit"
                className="absolute md:bottom-3 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 dark:disabled:bg-white disabled:bg-black disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white p-0.5 border border-black rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors"
                data-testid="send-button"
              >
                <ArrowUpIcon size={22} />
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="relative px-2 py-2 text-center text-xs text-gray-600 md:px-[60px]">
        <span>
          ChatGPT can make mistakes. Consider checking important information.
        </span>
      </div>
    </div>
  );
};

export default ChatForm;
