import React from "react";
import {
  HeartIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  TrendingUpIcon,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col gap-20 overflow-y-scroll border-r-[0.5px] border-r-gray-700/70 p-4 py-5 text-white">
      <div className="mx-auto mt-0.5 h-6 w-6">
        <MenuIcon className="h-full w-full cursor-pointer" />
      </div>

      <ul className="flex flex-col gap-6 text-center">
        <li className="group mx-auto">
          <HomeIcon className="h-4 w-4 cursor-pointer transition-all duration-100 group-hover:text-red-700" />
        </li>
        <li className="group mx-auto">
          <TrendingUpIcon className="h-4 w-4 cursor-pointer transition-all duration-100 group-hover:text-red-700" />
        </li>
        <li className="group mx-auto">
          <HeartIcon className="h-4 w-4 cursor-pointer transition-all duration-100 group-hover:text-red-700" />
        </li>
      </ul>

      <ul className="flex h-full flex-col gap-4 overflow-auto text-center">
        {Array.from(new Array(6)).map((item) => (
          <li>
            <div className="mx-auto h-5 w-5 rounded-full bg-[url(https://random.imagecdn.app/100/300)] bg-cover"></div>
          </li>
        ))}
      </ul>

      <div className="mx-auto h-4 w-4 grow">
        <LogOutIcon className="h-full w-full cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
