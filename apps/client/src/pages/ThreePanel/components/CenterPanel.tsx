// Center Panel - Main conversation area
import React from "react";
import { useThreePanel } from "../context/ThreePanelContext";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { Button } from "@/components/ui/shadcn/button";
import { 
  MoreHorizontal, 
  Mic, 
  Send, 
  ThumbsUp, 
  ThumbsDown,
  Copy,
  RotateCcw
} from "lucide-react";

export const CenterPanel: React.FC = () => {
  const { title, subtitle, chat } = useThreePanel();

  const assistantMessage = chat[0];

  return (
    <div
      className="
        flex-[2]
        min-w-0
        bg-[#2A2E33]
        border border-[#3E4349]
        rounded-[12px]
        flex flex-col
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-[20px] pt-[16px] pb-[12px] border-b border-[#3E4349]">
        <div className="flex items-center gap-[8px]">
          <h2 className="text-[11px] leading-[16px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Chat
          </h2>
          <div className="flex items-center gap-1">
            <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#35393F] text-[11px] text-[#9CA3AF]">
              ℹ️
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-[24px] w-[24px] rounded-md text-[#9CA3AF] hover:bg-white/5 hover:text-white"
          >
            <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-[24px] w-[24px] rounded-md text-[#9CA3AF] hover:bg-white/5 hover:text-white"
          >
            <MoreHorizontal className="w-[14px] h-[14px]" />
          </Button>
        </div>
      </div>

      {/* Document title */}
      <div className="px-[20px] pt-[16px] pb-[12px]">
        <h3 className="text-[18px] leading-[26px] font-medium text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-[2px] text-[12px] leading-[16px] text-[#9CA3AF]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Message area */}
      <ScrollArea className="flex-1 px-[20px] pb-[12px]">
        {assistantMessage && (
          <div className="mt-[8px]">
            <div className="text-[13px] leading-[20px] text-[#E5E7EB]">
              {assistantMessage.content}
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-[6px] mt-[12px]">
              <Button
                variant="ghost"
                size="icon"
                className="h-[28px] w-[28px] rounded-full border border-[#4A5057] bg-[#35393F] hover:bg-[#3A3E44] text-[#9CA3AF]"
              >
                <Copy className="w-[13px] h-[13px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-[28px] w-[28px] rounded-full border border-[#4A5057] bg-[#35393F] hover:bg-[#3A3E44] text-[#9CA3AF]"
              >
                <RotateCcw className="w-[13px] h-[13px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-[28px] w-[28px] rounded-full border border-[#4A5057] bg-[#35393F] hover:bg-[#3A3E44] text-[#9CA3AF]"
              >
                <ThumbsUp className="w-[13px] h-[13px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-[28px] w-[28px] rounded-full border border-[#4A5057] bg-[#35393F] hover:bg-[#3A3E44] text-[#9CA3AF]"
              >
                <ThumbsDown className="w-[13px] h-[13px]" />
              </Button>
            </div>
          </div>
        )}

        {/* Suggested prompts */}
        <div className="mt-[20px] space-y-[10px]">
          <button
            className="
              w-full
              text-left
              rounded-[8px]
              bg-[#35393F]
              border border-[#4A5057]
              px-[14px] py-[10px]
              text-[12px] text-[#E5E7EB]
              hover:bg-[#3A3E44]
              transition-colors
            "
          >
            How does the system's innovative architecture ensure safety and cognitive accessibility for vulnerable users?
          </button>
          <button
            className="
              w-full
              text-left
              rounded-[8px]
              bg-[#35393F]
              border border-[#4A5057]
              px-[14px] py-[10px]
              text-[12px] text-[#E5E7EB]
              hover:bg-[#3A3E44]
              transition-colors
            "
          >
            What measures ensure safety and cognitive load for vulnerable users?
          </button>
        </div>
      </ScrollArea>

      {/* Input area */}
            {/* Input area */}
      <div className="px-[20px] pb-[16px] pt-[12px] border-t border-[#3E4349]">
        <div
          className="
            flex items-center gap-[10px]
            bg-[#35393F]
            rounded-full
            px-[16px] py-[10px]
            border border-[#4A5057]
          "
        >
          <Mic className="w-[16px] h-[16px] text-[#9CA3AF]" />
          <input
            className="
              flex-1
              bg-transparent
              border-0
              outline-none
              text-[13px]
              text-[#E5E7EB]
              placeholder:text-[#6B7280]
            "
            placeholder="Start typing..."
          />
          <div className="flex items-center gap-[10px]">
            <span className="text-[12px] text-[#9CA3AF]">
              8 sources
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-[28px] w-[28px] rounded-full bg-white text-black hover:bg-gray-200"
            >
              <Send className="w-[13px] h-[13px]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
