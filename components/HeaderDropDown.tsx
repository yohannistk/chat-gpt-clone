import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  Circle,
  LucideIcon,
  Sparkles,
  Zap,
} from "lucide-react";

import React from "react";

const HeaderPopOver = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          role="button"
          className="flex items-center gap-1 px-3 py-2  hover:bg-black/5 rounded-2xl"
        >
          <div className="font-semibold font-semibold]">ChatGPT </div>
          <div className="text-[#555] font-bold">3.5</div>
          <ChevronDown className="text-[#444]" size={17} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[340px] rounded-md border p-1.5"
        align="start"
      >
        <HeaderPopOverList
          hasButton={false}
          icon={Zap}
          selected={true}
          title="GPT-3.5"
          subtitle="Great for everyday tasks"
        />
        <HeaderPopOverList
          selected={false}
          hasButton={true}
          icon={Sparkles}
          title="GPT-4"
          subtitle="Our smartest and most capable model. Includes DALL·E, browsing and more."
        />
      </PopoverContent>
    </Popover>
  );
};

export default HeaderPopOver;

interface HeaderPopOverListProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  hasButton: boolean;
  selected: boolean;
}

const HeaderPopOverList = ({
  icon: Icon,
  subtitle,
  title,
  hasButton,
  selected,
}: HeaderPopOverListProps) => {
  return (
    <div className="p-2 flex items-center gap-3 cursor-pointer rounded-md hover:bg-black/5">
      <Icon size={18} />
      <div className="flex justify-between flex-1 gap-2 items-center">
        <div className="flex flex-col gap-0.5">
          <span>{title}</span>
          <span className="text-[#A0A0A0] max-w-full text-[13px]">
            {subtitle}
          </span>
          {hasButton && (
            <button className="bg-[#ab68ff] font-semibold outline-none text-xs text-white rounded-md p-2">
              Upgrade to Plus
            </button>
          )}
        </div>
        {selected ? (
          <CheckCircle2 fill="#000" size={24} color="#fff" />
        ) : (
          <Circle size={35} />
        )}
      </div>
    </div>
  );
};
