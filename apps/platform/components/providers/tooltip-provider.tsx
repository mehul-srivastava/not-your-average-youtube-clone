import { TooltipProvider } from "@repo/shadcn/components/ui/tooltip";
import React from "react";

const GlobalTooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <TooltipProvider delayDuration={0}>{children}</TooltipProvider>;
};

export default GlobalTooltipProvider;
