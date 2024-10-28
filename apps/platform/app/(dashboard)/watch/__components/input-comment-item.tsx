import React from "react";

import { Button } from "@repo/shadcn/components/ui/button";
import { Input } from "@repo/shadcn/components/ui/input";

const InputCommentItem = ({
  userId,
  userImage,
}: {
  userId: string;
  userImage: string;
}) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div
          className="h-10 w-10 rounded-full bg-cover"
          style={{ backgroundImage: `url(${userImage})` }}
        />
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

export default InputCommentItem;
