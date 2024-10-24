import React from "react";

const LiveChatHeader = () => {
  return (
    <div className="absolute left-0 top-0 z-20 flex w-full items-center gap-2 rounded-t-[inherit] bg-[#000]">
      <div className="flex items-center gap-2 p-3 px-4">
        <span className="bg-destructive block h-2 w-2 rounded-full" />
        <span>Live Chat</span>
      </div>
    </div>
  );
};

export default LiveChatHeader;
