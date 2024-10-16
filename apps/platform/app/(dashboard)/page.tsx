import {
  CheckIcon,
  EyeIcon,
  FlameIcon,
  RadioIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <div>
        <div className="flex items-center gap-4">
          <RadioIcon className="text-destructive" />
          <h2 className="text-xl">Discover Live</h2>
        </div>
        <div className="mt-4 grid w-full grid-cols-3 gap-4">
          {Array.from(new Array(3)).map((item) => (
            <Link
              className="rounded-md p-4 transition-all duration-200 hover:bg-black"
              key={item}
              href="/live/2121"
            >
              <div className="relative h-48 w-full rounded-sm bg-[url(https://random.imagecdn.app/600/400)] bg-cover">
                <div className="absolute bottom-4 left-4 h-8 w-8 rounded-full bg-white bg-[url(https://www.pngplay.com/wp-content/uploads/13/Google-Logo-PNG-Photo-Image.png)] bg-cover shadow-md"></div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <UsersRoundIcon className="text-destructive h-4 w-4" />
                  <span>886 watching</span>
                </p>
                <p className="text-sm text-gray-500">25 minutes ago</p>
              </div>

              <h3 className="mt-2">ADOBE Max 2021: Day 1 Highlights</h3>
              <small className="flex items-center gap-2 text-base text-gray-500">
                Youtube <CheckIcon className="h-3 w-3 text-emerald-500" />
              </small>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 gap-y-6">
          <FlameIcon className="text-destructive" />
          <h2 className="text-xl">Trending Videos</h2>
        </div>
        <div className="mt-4 grid w-full grid-cols-5 gap-4">
          {Array.from(new Array(12)).map((item) => (
            <a
              className="rounded-md p-2 transition-all duration-200 hover:bg-black"
              href="/"
              key={item}
            >
              <div className="relative h-48 w-full rounded-sm bg-[url(https://random.imagecdn.app/600/400)] bg-cover" />

              <div className="mt-3 flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <EyeIcon className="text-destructive h-4 w-4" />
                  <span>2.1M views</span>
                </p>
                <p className="text-sm text-gray-500">25 minutes ago</p>
              </div>

              <h3 className="mt-2 font-normal">
                Young adults with physical disability find independence
              </h3>
              <small className="flex items-center gap-2 text-base font-normal text-gray-500">
                Youtube <CheckIcon className="h-3 w-3 text-emerald-500" />
              </small>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
