import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, ShareIcon, Trash } from "lucide-react";
import { Share } from "next/font/google";

export default function ChatOption() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex border-none outline-none items-center justify-center transition">
          <MoreHorizontal />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="py-3 cursor-pointer">
            <ShareIcon size={17} className="mr-2" /> Share
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3 cursor-pointer">
            <Pencil size={17} className="mr-2" /> Rename
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="py-3 cursor-pointer">
            <Trash size={17} className="mr-2" /> Delete Chat
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
