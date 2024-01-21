import HeaderDropDown from "@/components/HeaderDropDown";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUp, ArrowUpIcon, Share, Text } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 w-full">
        <div className="h-14 sticky top-0 bg-white px-3 flex justify-between items-center">
          <div className="md:hidden">
            <Button size={"icon"} variant={"outline"}>
              <Text />
            </Button>
          </div>
          <HeaderDropDown />
          <Button size={"icon"} variant={"outline"}>
            <Share size={18} />
          </Button>
        </div>

        {/* List Of chats */}
      </ScrollArea>
      <div className="w-full pt-2 dark:border-white/20 md:w-[calc(100%-.5rem)]">
        <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
          <div className="relative flex h-full flex-1 items-stretch md:flex-col">
            <div className="flex w-full items-center">
              <div className="overflow-hidden flex flex-col w-full flex-grow relative dark:text-white rounded-2xl bg-white dark:bg-gray-800 ">
                <textarea className="border p-2 pr-6 resize-none rounded-2xl"></textarea>
                <button
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
    </div>
  );
};

export default Dashboard;
