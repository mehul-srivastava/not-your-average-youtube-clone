import React, { useRef } from "react";
import { SendIcon } from "lucide-react";

import { Input } from "@repo/shadcn/components/ui/input";

interface IChat {
  authorId: number;
  message: string;
  type: string;
  createdAt: Date;
}

const LiveChatInput = ({
  setChats,
}: {
  setChats: React.Dispatch<React.SetStateAction<IChat[]>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function sendMessage() {
    console.log(inputRef.current?.value!);
    if (!inputRef.current) return;

    setChats((prev) => [
      ...prev,
      {
        authorId: 1,
        message: inputRef.current?.value!,
        type: "me",
        createdAt: new Date(),
      },
    ]);

    inputRef.current.value = ""; // Clear the input value
  }

  return (
    <div className="flex items-center gap-2 rounded-b-[inherit] bg-[#000]">
      <div className="flex w-full items-center justify-between gap-4 p-3 px-4">
        <Input className="grow" ref={inputRef} />
        <SendIcon className="h-6 w-6 cursor-pointer" onClick={sendMessage} />
      </div>
    </div>
  );
};

export default LiveChatInput;
