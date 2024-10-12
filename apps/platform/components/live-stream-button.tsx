import Link from "next/link";
import React from "react";

const LiveStreamButton = () => {
  return (
    <Link className="cursor-pointer" href={"/live"}>
      Go Live
    </Link>
  );
};

export default LiveStreamButton;
