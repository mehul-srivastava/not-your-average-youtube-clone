import React from "react";
import { HeartIcon, HomeIcon, LogOutIcon, TrendingUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@repo/shadcn/components/ui/button";
import { auth, signOut } from "@/auth";
import { ApiGetSubscriptions } from "@/types";

const Sidebar = async () => {
  const session = await auth();

  async function logoutFromGoogle() {
    "use server";
    await signOut();
  }

  const data = await fetch("http://localhost:3000/api/subscriptions", {
    next: {
      tags: ["subscriptions"],
    },
  });
  const response = await data.json();

  return (
    <div className="bg-brand flex h-full flex-col gap-20 overflow-y-scroll border-r-[0.5px] border-r-gray-700/70 p-4 py-5 text-white">
      <Image
        src="/logo.png"
        width={32}
        height={32}
        className="mx-auto block h-6 w-6 cursor-pointer"
        alt="youtube clone logo"
      />

      <ul className="flex flex-col gap-6 text-center">
        <li className="group mx-auto cursor-pointer">
          <Link href="/">
            <HomeIcon className="h-4 w-4 transition-all duration-100 group-hover:text-red-700" />
          </Link>
        </li>
        <li className="group mx-auto cursor-pointer">
          <TrendingUpIcon className="h-4 w-4 transition-all duration-100 group-hover:text-red-700" />
        </li>
        <li className="group mx-auto cursor-pointer">
          <HeartIcon className="h-4 w-4 transition-all duration-100 group-hover:text-red-700" />
        </li>
      </ul>

      <ul className="flex h-full flex-col gap-4 overflow-auto text-center">
        {response &&
          response.data.map((item: any) => (
            <li key={item.id}>
              <div
                className="mx-auto h-5 w-5 rounded-full bg-cover"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              ></div>
            </li>
          ))}
      </ul>

      {session && (
        <form className="group mx-auto" action={logoutFromGoogle}>
          <Button type="submit" size={"icon"} variant={"link"}>
            <LogOutIcon className="h-4 w-4 cursor-pointer group-hover:text-red-700" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default Sidebar;
