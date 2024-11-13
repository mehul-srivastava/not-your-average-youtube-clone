import React from "react";
import { AntennaIcon, HeartIcon, HomeIcon, UserIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/shadcn/components/ui/tooltip";
import LogoutButton from "./buttons/logout-button";

const Sidebar = async () => {
  const session = await auth();

  const data = await fetch("http://localhost:3000/api/artifacts/read/subscription", {
    next: {
      tags: ["subscriptions"],
    },
    headers: headers(),
  });
  const response = await data.json();

  return (
    <div className="bg-brand flex h-full flex-col gap-20 overflow-y-scroll border-r-[0.5px] border-r-gray-700/70 p-4 py-[1.45rem] text-white">
      <a target="_blank" href="https://github.com/mehul-srivastava/not-your-average-youtube-clone">
        <Image src="/logo.png" width={32} height={32} className="mx-auto block h-6 w-6 cursor-pointer" alt="youtube clone logo" />
      </a>

      <ul className="flex flex-col gap-6 text-center">
        <li className="group mx-auto cursor-pointer">
          <Link href="/">
            <HomeIcon className="h-4 w-4 transition-all duration-100 group-hover:text-red-700" />
          </Link>
        </li>
        <li className="group mx-auto cursor-pointer">
          <Link href="/live-stream">
            <AntennaIcon className="h-4 w-4 transition-all duration-100 group-hover:text-red-700" />
          </Link>
        </li>
        <li className="group mx-auto cursor-pointer">
          <Link href="/watch/liked">
            <HeartIcon className="h-4 w-4 transition-all duration-100 group-hover:text-red-700" />
          </Link>
        </li>
      </ul>

      <ul className="flex h-full flex-col gap-4 overflow-auto text-center">
        {response.data &&
          response.data.length > 0 &&
          response.data?.map((item: any) => (
            <Tooltip key={item.id}>
              <TooltipTrigger>
                <div className="mx-auto h-5 w-5 rounded-full bg-cover" style={{ backgroundImage: `url("${item.imageUrl}")` }} />
              </TooltipTrigger>
              <TooltipContent side="right" className="p-1 px-2 text-xs">
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
      </ul>

      {session && <LogoutButton />}
    </div>
  );
};

export default Sidebar;
