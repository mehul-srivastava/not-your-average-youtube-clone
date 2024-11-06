"use client";

import { Button } from "@repo/shadcn/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await signOut();
        router.refresh();
      }}
      size={"icon"}
      variant={"link"}
    >
      <LogOutIcon className="h-4 w-4 cursor-pointer group-hover:text-red-700" />
    </Button>
  );
};

export default LogoutButton;
