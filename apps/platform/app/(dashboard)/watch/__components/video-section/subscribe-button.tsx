"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@repo/shadcn/components/ui/button";

interface IComponentProps {
  userId: string;
  videoId: string;
  currentUserIsSubscriber: boolean;
}

const SubscribeButton = ({
  userId,
  videoId,
  currentUserIsSubscriber,
}: IComponentProps) => {
  const session = useSession();
  const router = useRouter();
  const [alreadySubscribed, setAlreadySubscribed] = useState(
    currentUserIsSubscriber,
  );

  async function subscribeToUser() {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/watch?v=".concat(videoId));
      return;
    }

    const response = await axios.post("/api/subscriptions", {
      userId,
      alreadySubscribed: alreadySubscribed,
    });

    if (!response.data.done) {
      toast.error("You cannot subscribe to yourself!");
      return;
    }

    if (response.data.subscribed) {
      toast.success("You have subscribed to this user!");
      setAlreadySubscribed(true);
    } else {
      toast.success("You have unsubscribed to this user!");
      setAlreadySubscribed(false);
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
