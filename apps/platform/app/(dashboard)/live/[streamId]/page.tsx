import React from "react";
import { CircleUserIcon, SendIcon, UserIcon } from "lucide-react";

import { Input } from "@repo/shadcn/components/ui/input";
import VideoPlayer from "@/components/video-player";

const page = () => {
  return (
    <div className="bg-red flex h-full gap-4 p-10">
      <div className="h-[800px] w-9/12 rounded-md">
        <VideoPlayer />
      </div>
      <div className="relative max-h-[800px] w-3/12 rounded-md bg-black/40 p-5">
        <div className="absolute left-0 top-0 flex w-full items-center gap-2 rounded-t-[inherit] bg-[#000]">
          <div className="flex items-center gap-2 p-3 px-4">
            <span className="bg-destructive block h-2 w-2 rounded-full" />
            <span>Live Chat</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 flex w-full items-center gap-2 rounded-t-[inherit] bg-[#000]">
          <div className="flex w-full items-center justify-between gap-4 p-3 px-4">
            <Input className="grow" />
            <SendIcon className="h-6 w-6 cursor-pointer" />
          </div>
        </div>

        <div className="flex h-full flex-col gap-2 overflow-y-auto pb-16 pt-12">
          <p className="w-fit max-w-[75%] break-words rounded-t-md rounded-br-md bg-gray-800 p-2 text-sm">
            HTMLVideoElement
          </p>
          <p className="w-fit max-w-[75%] break-words rounded-t-md rounded-br-md bg-gray-800 p-2 text-sm">
            HTMLVideoElement
          </p>
          <p className="w-fit max-w-[75%] break-words rounded-t-md rounded-br-md bg-gray-800 p-2 text-sm">
            HTMLVideoElement
          </p>
          <p className="w-fit max-w-[75%] break-words rounded-t-md rounded-br-md bg-gray-800 p-2 text-sm">
            HTMLVideoElement
          </p>
          <p className="w-fit max-w-[75%] break-words rounded-t-md rounded-br-md bg-gray-800 p-2 text-sm">
            HTMLVideoElementHTMLVideoElementHTMLVideoElementHTMLVideoElementHTMLVideoElementHTMLVideoElementHTMLVideoElementHTMLVideoElementHTMLVideoElementHTMLVideoElementHTMLVideoElementHTMLVideoElement
          </p>

          {/* My message */}
          <p className="my-2 ml-auto w-fit max-w-[75%] break-words rounded-t-md rounded-bl-md bg-gray-500 p-2 text-sm">
            Hello from mehuls sideHello from mehuls sideHello from mehuls
            sideHello from mehuls sideHello from mehuls side
          </p>

          {/* System message */}
          <p className="mx-auto flex items-center gap-2 text-center text-sm text-gray-700">
            <CircleUserIcon className="h-4 w-4" />
            <span>Rahul joined the stream</span>
          </p>
          <p className="mx-auto flex items-center gap-2 text-center text-sm text-gray-700">
            <CircleUserIcon className="h-4 w-4" />
            <span>Rahul joined the stream</span>
          </p>
          <p className="mx-auto flex items-center gap-2 text-center text-sm text-gray-700">
            <CircleUserIcon className="h-4 w-4" />
            <span>Rahul joined the stream</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
