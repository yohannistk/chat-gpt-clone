import React from "react";
import { Button } from "./ui/button";
import { Share, Text } from "lucide-react";
import HeaderDropDown from "@/components/HeaderDropDown";

const ChatHeader = () => {
  return (
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
  );
};

export default ChatHeader;
