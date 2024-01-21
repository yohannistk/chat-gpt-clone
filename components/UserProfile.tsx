"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";

const UserProfile = () => {
  const user = useClerk();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="min-h-[44px] w-full cursor-pointer flex gap-2 items-center p-2 hover:bg-[#202123] rounded-md">
          <div className="w-8 h-8 rounded-full flex justify-center items-center">
            <Image
              className="rounded-full "
              width={32}
              height={32}
              src={user.user?.imageUrl!}
              alt="User"
            />
          </div>
          <span className="font-semibold text-sm">
            {user.user?.firstName + " " + user.user?.lastName}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full rounded-md border p-1.5" align="start">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
          recusandae reiciendis unde tempora! In, magni minus! Neque pariatur
          aperiam autem sint
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
