// ThreePanel Context - manages state for the three-panel interface
import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";

export type Source = {
  id: string;
  name: string;
  type: "pdf" | "web" | "note";
  checked: boolean;
  meta?: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
};

export type StudioItem = {
  id: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
};

export interface ThreePanelState {
  title: string;
  subtitle?: string;
  sources: Source[];
  chat: ChatMessage[];
  studioItems: StudioItem[];
}

const ThreePanelContext = createContext<ThreePanelState | null>(null);

export const useThreePanel = () => {
  const ctx = useContext(ThreePanelContext);
  if (!ctx) {
    throw new Error("useThreePanel must be used within ThreePanelProvider");
  }
  return ctx;
};

interface ThreePanelProviderProps {
  children: ReactNode;
}

/**
 * ThreePanel Provider - provides state for the three-panel layout
 * For now this is static demo data – swap with real state / reducers as needed.
 */
export const ThreePanelProvider: React.FC<ThreePanelProviderProps> = ({ children }) => {
  const value: ThreePanelState = {
    title: "Senior AI: Accessible Ecosystem Through Visual Cards",
    subtitle: "8 sources",
    sources: [
      {
        id: "1",
        name: "COMPLETE_PITCH_DECK.pdf",
        type: "pdf",
        checked: true,
        meta: "",
      },
      {
        id: "2",
        name: "Financial_Plan_Annex_DRAFT.pdf",
        type: "pdf",
        checked: true,
      },
      {
        id: "3",
        name: "Implementation_Plan_Annex.pdf",
        type: "pdf",
        checked: true,
      },
      {
        id: "4",
        name: "Part_B_Section_1_Excellence.pdf",
        type: "pdf",
        checked: true,
      },
      {
        id: "5",
        name: "Part_B_Section_2_Impact.pdf",
        type: "pdf",
        checked: true,
      },
      {
        id: "6",
        name: "Part_B_Section_3_Implementation.pdf",
        type: "pdf",
        checked: true,
      },
      {
        id: "7",
        name: "Senior AI EIC Draft 251124.pdf",
        type: "pdf",
        checked: true,
      },
      {
        id: "8",
        name: "Senior AI: Accessible Ecosystem...",
        type: "web",
        checked: true,
      },
    ],
    chat: [
      {
        id: "c1",
        role: "assistant",
        content:
          "The sources comprise a comprehensive pitch deck and supporting documentation for Senior AI, an innovative, cognitive-accessible AI assistant targeting the digitally excluded elderly population in Europe. The core innovation is the Conversation Atlas, a multi-resolution, branch-preserving memory system designed to reduce cognitive load errors, enabling users to safely execute complex, multi-domain tasks such as banking and healthcare through a simplified, card-based interface. The materials heavily emphasise EU compliance with standards like GDPR, eIDAS, and EN 301 549 (accessibility), positioning the company with a significant regulatory moat against US competitors. Financially the project requests €6.5-7M in funding (including a €2.5M EIC grant) to advance from a TRL 5 prototype to a TRL 8 production-ready platform within 18 months through rigorous development and 10-15 operational pilots, projecting €64M in annual recurring revenue by Year 5. Ultimately, Senior AI aims to address the Digital Decade 2030 skills gap by fostering digital independence and safety for over 200 million elderly Europeans.",
        timestamp: "2m ago",
      },
    ],
    studioItems: [
      {
        id: "s1",
        title: "Senior AI: Accessible...",
        subtitle: "2m ago",
      },
      {
        id: "s2",
        title: "Senior AI...",
        subtitle: "8 sources · 2h ago",
      },
      {
        id: "s3",
        title: "Senior AI: Den tillgängliga...",
        subtitle: "Create your own · 8 sources · 6h ago",
      },
      {
        id: "s4",
        title: "Investeringsmemorandum...",
        subtitle: "Investment Memorandum · 8 sources · 6h ago",
      },
      {
        id: "s5",
        title: "Hur Senior AI:s design adresserar...",
        subtitle: "Concept design · 4 sources · 6h ago",
      },
    ],
  };

  return (
    <ThreePanelContext.Provider value={value}>{children}</ThreePanelContext.Provider>
  );
};
