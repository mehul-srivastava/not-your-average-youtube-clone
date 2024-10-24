import React from "react";
import { SendIcon } from "lucide-react";

import { Input } from "@repo/shadcn/components/ui/input";

const LiveChatInput = () => {
  return (
    <div className="flex items-center gap-2 rounded-b-[inherit] bg-[#000]">
      <div className="flex w-full items-center justify-between gap-4 p-3 px-4">
        <Input className="grow" />
        <SendIcon className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default LiveChatInput;
