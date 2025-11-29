// Right Panel - Tool cards and studio items
import { Button } from "@/components/ui/shadcn/button";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import {
    AudioLines,
    BrainCircuit,
    Copy,
    FileText,
    MoreHorizontal,
    Plus,
    Video,
} from "lucide-react";
import React from "react";
import { useThreePanel } from "../context/ThreePanelContext";

const baseToolCard =
  "relative flex flex-col justify-between " +
  "h-[90px] w-full rounded-[12px] " +
  "px-[14px] py-[12px] " +
  "border " +
  "text-left " +
  "transition-all duration-150 " +
  "hover:brightness-110";

const toolVariantClasses: Record<string, string> = {
  audio: "bg-[#3A3E44] border-[#4A5057]",
  video: "bg-[#2F4A42] border-[#3E5850]",
  mind: "bg-[#4A3A4A] border-[#5A4A5A]",
  reports: "bg-[#4A4233] border-[#5A5243]",
};

interface StudioToolCardProps {
  variant: "audio" | "video" | "mind" | "reports";
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StudioToolCard: React.FC<StudioToolCardProps> = ({
  variant,
  title,
  description,
  icon,
}) => (
  <button className={`${baseToolCard} ${toolVariantClasses[variant]}`}>
    <div className="flex items-center gap-[10px]">
      <div className="flex items-center justify-center h-[28px] w-[28px] rounded-full bg-black/20">
        {icon}
      </div>
      <span className="text-[13px] leading-[18px] font-medium text-white">
        {title}
      </span>
    </div>
    <p className="text-[11px] leading-[16px] text-[#9CA3AF] mt-[4px]">
      {description}
    </p>
  </button>
);

export const RightPanel: React.FC = () => {
  const { studioItems } = useThreePanel();

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
          Studio
        </h2>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-[24px] w-[24px] rounded-md text-[#9CA3AF] hover:bg-white/5 hover:text-white"
          >
            <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
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

      {/* Tool cards */}
      <div className="px-[20px] mb-[20px]">
        <div className="grid grid-cols-2 gap-[10px]">
          <StudioToolCard
            variant="audio"
            title="Audio Over"
            description="Listen to this report"
            icon={<AudioLines className="w-[16px] h-[16px] text-white" />}
          />
          <StudioToolCard
            variant="video"
            title="Video Over"
            description="Generate a video explainer"
            icon={<Video className="w-[16px] h-[16px] text-white" />}
          />
          <StudioToolCard
            variant="mind"
            title="Mind Map"
            description="Visualise key ideas"
            icon={<BrainCircuit className="w-[16px] h-[16px] text-white" />}
          />
          <StudioToolCard
            variant="reports"
            title="Reports"
            description="Create a structured report"
            icon={<FileText className="w-[16px] h-[16px] text-white" />}
          />
        </div>
      </div>

      {/* Divider with tools */}
      <div className="px-[20px] mb-[12px] flex items-center gap-2">
        <div className="flex-1 h-[1px] bg-[#3E4349]" />
        <div className="flex items-center gap-[4px]">
          <Button
            variant="ghost"
            size="icon"
            className="h-[22px] w-[22px] rounded-md text-[#9CA3AF] hover:bg-white/5 hover:text-white"
          >
            <FileText className="w-[12px] h-[12px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-[22px] w-[22px] rounded-md text-[#9CA3AF] hover:bg-white/5 hover:text-white"
          >
            <BrainCircuit className="w-[12px] h-[12px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-[22px] w-[22px] rounded-md text-[#9CA3AF] hover:bg-white/5 hover:text-white"
          >
            <Copy className="w-[12px] h-[12px]" />
          </Button>
        </div>
      </div>

      {/* List of studio notes */}
      <ScrollArea className="flex-1 px-[20px]">
        <div className="space-y-[8px] pb-[8px]">
          {studioItems.map((item) => (
            <div
              key={item.id}
              className="
                w-full
                flex items-center justify-between
                min-h-[56px]
                rounded-[8px]
                px-[12px] py-[10px]
                bg-[#35393F]
                border border-transparent
                text-left
                hover:bg-[#3A3E44]
                transition-colors
                cursor-pointer
              "
            >
              <div className="flex items-center gap-[10px] flex-1 min-w-0">
                <div className="flex items-center justify-center h-[32px] w-[32px] rounded-[6px] bg-[#2A2E33] border border-[#3E4349] flex-shrink-0">
                  <FileText className="w-[14px] h-[14px] text-[#9CA3AF]" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[13px] leading-[18px] text-white truncate">
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span className="text-[11px] leading-[16px] text-[#9CA3AF] truncate">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  className="inline-flex items-center justify-center h-[24px] w-[24px] rounded-full text-sa-text-secondary hover:bg-white/10 hover:text-sa-text-primary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Copy className="w-[12px] h-[12px]" />
                </button>
                <button
                  className="inline-flex items-center justify-center h-[24px] w-[24px] rounded-full text-sa-text-secondary hover:bg-white/10 hover:text-sa-text-primary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreHorizontal className="w-[12px] h-[12px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer add button */}
      <div className="px-[20px] py-[12px] border-t border-[#3E4349]">
        <button
          className="
            w-full
            h-[36px]
            rounded-full
            bg-white
            text-[12px] text-black font-medium
            hover:bg-gray-200
            transition-colors
            flex items-center justify-center gap-[6px]
          "
        >
          <Plus className="w-[14px] h-[14px]" />
          <span>Add note</span>
        </button>
      </div>
    </div>
  );
};
