// ThreePanel Layout - Main three-panel interface
import React from "react";
import { LeftPanel } from "./components/LeftPanel";
import { CenterPanel } from "./components/CenterPanel";
import { RightPanel } from "./components/RightPanel";
import { ThreePanelProvider } from "./context/ThreePanelContext";
import { Button } from "@/components/ui/shadcn/button";
import { MoreHorizontal, Share2, Grid3x3 } from "lucide-react";

export const ThreePanelLayout: React.FC = () => {
  return (
    <ThreePanelProvider>
      <div className="min-h-screen w-screen bg-[#1F2328] text-white font-sans">
        {/* Top app bar */}
        <header className="h-[64px] bg-[#2A2E33] border-b border-[#3E4349] flex items-center">
          <div className="w-full max-w-[2048px] mx-auto px-[20px] flex items-center justify-between">
            <div className="flex items-center gap-[12px]">
              {/* Logo/Icon */}
              <div className="flex items-center justify-center h-[32px] w-[32px] rounded-full bg-[#35393F]">
                <span className="text-[16px]">🎯</span>
              </div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-[14px] leading-[20px] font-normal text-white">
                  Senior AI: Accessible Ecosystem Through Visual Cards
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-[4px]">
              <Button
                variant="ghost"
                size="icon"
                className="h-[32px] w-[32px] rounded-md text-[#9CA3AF] hover:bg-white/5 hover:text-white"
              >
                <Share2 className="w-[16px] h-[16px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-[32px] w-[32px] rounded-md text-[#9CA3AF] hover:bg-white/5 hover:text-white"
              >
                <Grid3x3 className="w-[16px] h-[16px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-[32px] w-[32px] rounded-md text-[#9CA3AF] hover:bg-white/5 hover:text-white"
              >
                <MoreHorizontal className="w-[16px] h-[16px]" />
              </Button>
              <div className="ml-[8px] h-[32px] w-[32px] rounded-full bg-[#5B21B6] flex items-center justify-center text-white text-[14px] font-medium">
                K
              </div>
            </div>
          </div>
        </header>

        {/* Three-panel flex layout */}
        <main className="w-full h-[calc(100vh-64px)]">
          <div className="h-full max-w-[2048px] mx-auto px-[20px] pt-[16px] pb-[16px]">
            <div className="flex gap-[12px] h-full">
              <LeftPanel />
              <CenterPanel />
              <RightPanel />
            </div>
          </div>
        </main>
      </div>
    </ThreePanelProvider>
  );
};

export default ThreePanelLayout;
