// Left Panel - Displays document sources
import React from "react";
import { useThreePanel } from "../context/ThreePanelContext";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { Button } from "@/components/ui/shadcn/button";
import { Search, Globe, FileText, Copy } from "lucide-react";

export const LeftPanel: React.FC = () => {
  const { sources } = useThreePanel();

  const iconForType = (type: string) => {
    switch (type) {
      case "web":
        return <Globe className="w-[14px] h-[14px]" />;
      default:
        return <FileText className="w-[14px] h-[14px]" />;
    }
  };

  return (
    <div
      className="
        flex-1
        min-w-0
        bg-[#2A2E33]
        border border-[#3E4349]
        rounded-[12px]
        flex flex-col
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-[20px] pt-[16px] pb-[12px]">
        <h2 className="text-[11px] leading-[16px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
          Sources
        </h2>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-[24px] w-[24px] rounded-md text-[#9CA3AF] hover:bg-white/5 hover:text-white"
          >
            <Copy className="w-[14px] h-[14px]" />
          </Button>
        </div>
      </div>

      {/* Try Deep Research banner */}
      <div className="px-[20px] pb-[12px]">
        <button
          className="
            w-full
            rounded-[8px]
            bg-[#1A4D3E]
            border border-[#2A5D4E]
            px-[12px] py-[8px]
            text-left
            hover:bg-[#1F5646]
            transition-colors
          "
        >
          <div className="flex items-start gap-[10px]">
            <span className="text-[18px]">🔍</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] leading-[18px] text-white font-medium">
                Try Deep Research
              </p>
              <p className="text-[11px] leading-[16px] text-[#A8C5BC] mt-[1px]">
                for an in-depth report and new sources!
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Search web control */}
      <div className="px-[20px] pb-[10px]">
        <button
          className="
            w-full h-[32px]
            rounded-full
            bg-[#35393F]
            border border-[#4A5057]
            text-[12px] text-[#9CA3AF]
            flex items-center justify-between
            px-[14px]
            hover:bg-[#3A3E44]
            transition-colors
          "
        >
          <span className="inline-flex items-center gap-[8px]">
            <Search className="w-[14px] h-[14px] text-[#9CA3AF]" />
            <span className="text-[12px]">Search the web for new sources</span>
          </span>
          <span className="flex items-center gap-[6px]">
            <Globe className="w-[14px] h-[14px]" />
            <span className="text-[11px]">⌘</span>
          </span>
        </button>
      </div>

      {/* Select all sources */}
      <div className="px-[20px] pb-[10px]">
        <button
          className="
            text-[11px] text-[#9CA3AF]
            hover:text-white
            flex items-center gap-[6px]
            transition-colors
          "
        >
          <span>Select all sources</span>
          <span className="text-[12px]">✓</span>
        </button>
      </div>

      {/* List */}
      <ScrollArea className="flex-1 px-[16px] pb-[16px]">
        <div className="space-y-[6px]">
          {sources.map((s) => (
            <div
              key={s.id}
              className="
                w-full
                flex items-center gap-[10px]
                rounded-[6px]
                bg-transparent
                border border-transparent
                px-[10px] py-[8px]
                text-left
                hover:bg-[#35393F]
                transition-colors
                cursor-pointer
              "
            >
              <Checkbox
                checked={s.checked}
                className="border-[#6B7280] data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:border-white"
              />
              <div className="flex items-center justify-between gap-[8px] flex-1 min-w-0">
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[13px] leading-[18px] text-white truncate">
                    {s.name}
                  </span>
                  {s.meta && (
                    <span className="text-[11px] leading-[16px] text-[#9CA3AF] truncate">
                      {s.meta}
                    </span>
                  )}
                </div>
                <div className="text-[#6B7280] flex-shrink-0">
                  {iconForType(s.type)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
