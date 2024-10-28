"use client";

import React from "react";
import axios from "axios";

import { Button } from "@repo/shadcn/components/ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SubscribeButton = ({
  userId,
  videoId,
}: {
  userId: string;
  videoId: string;
}) => {
  const session = useSession();
  const router = useRouter();

  async function subscribeToUser() {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/watch?v=".concat(videoId));
      return;
    }

    await axios.post("/api/subscriptions", {
      userId,
    });
  }

  return (
    <Button size={"sm"} variant={"destructive"} onClick={subscribeToUser}>
      Subscribe
    </Button>
  );
};

export default SubscribeButton;
