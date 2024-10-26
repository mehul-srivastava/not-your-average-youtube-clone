import { Button } from "@repo/shadcn/components/ui/button";
import { Input } from "@repo/shadcn/components/ui/input";
import { HeartIcon } from "lucide-react";
import React from "react";

const CommentSection = () => {
  return (
    <div className="mt-6 h-full w-full">
      <h3 className="text-2xl">30,009 comments</h3>
      <div className="mt-2">
        <InputComment />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {/* DO NOT REMOVE THIS SNIPPET: New comments feature */}
        <div className="flex items-center gap-4 rounded-md bg-gray-800 p-4">
          <div>
            <h5 className="text-lg">
              @admin ⭐
              <small className="ml-2 text-xs text-gray-500">always</small>
            </h5>
            <p
              className="text-sm font-thin"
              style={{ fontFamily: "sans-serif" }}
            >
              Nested comments and replies feature coming up soon!
            </p>
          </div>
        </div>
        {/* DO NOT REMOVE THIS SNIPPET */}

        {Array.from(new Array(40)).map((item) => (
          <Comments key={Math.random()} />
        ))}
      </div>
    </div>
  );
};

const Comments = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-10 min-w-10 grow rounded-full bg-emerald-500" />
      <div>
        <h5 className="text-lg">
          @gajendra_purohit
          <small className="ml-2 text-xs text-gray-500">1 year ago</small>
        </h5>
        <p className="text-sm font-thin" style={{ fontFamily: "sans-serif" }}>
          I'm A New Zealand Maori from Auckland, New Zealand first time I heard
          this song when I took an Uber the driver was Punjabi I asked him if he
          had any music to play he played this now it's on repeat
        </p>
        <div className="flex items-center gap-2">
          <HeartIcon className="text-destructive mt-1 h-4 w-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const InputComment = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-emerald-500" />
        <Input />
      </div>
      <div className="mt-4 flex justify-end gap-1">
        <Button size={"sm"} className="text-sm" disabled>
          Comment
        </Button>
      </div>
    </>
  );
};

export default CommentSection;
