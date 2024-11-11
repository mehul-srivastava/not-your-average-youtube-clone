"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import axiosInstance from "@/lib/axios";
import { Button } from "@repo/shadcn/components/ui/button";

interface IComponentProps {
  userId: string;
  videoId: string;
  currentUserIsSubscriber: boolean;
}

const SubscribeButton = ({ userId, videoId, currentUserIsSubscriber }: IComponentProps) => {
  const session = useSession();
  const router = useRouter();
  const [alreadySubscribed, setAlreadySubscribed] = useState(currentUserIsSubscriber);

  async function subscribeToUser() {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/watch?v=".concat(videoId));
      return;
    }

    try {
      const response = await axiosInstance.post("/artifacts/create/subscription", {
        userId,
        alreadySubscribed: alreadySubscribed,
      });

      if (!response.data.success) {
        toast.error("You cannot subscribe to yourself!");
        return;
      }

      const hasSubscribed = response.data.subscribed;

      setAlreadySubscribed(hasSubscribed);
      toast.success(`You have ${hasSubscribed ? "subscribed" : "unsubscribed"} to this user!`);
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <Button
      size="sm"
      disabled={userId === session.data?.user?.id}
      variant={!alreadySubscribed ? "destructive" : "ghost"}
      onClick={subscribeToUser}
    >
      Subscribe{alreadySubscribed && "d"}
    </Button>
  );
};

export default SubscribeButton;
