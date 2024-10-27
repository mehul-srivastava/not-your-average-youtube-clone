import React from "react";

import prisma from "@/lib/prisma";
import VideoPlayer from "@/components/video-player";
import LiveChat from "./__components/live-chat";
import Image from "next/image";
import { CheckIcon, CircleAlertIcon } from "lucide-react";

interface IPageProps {
  params: { streamId: string };
}

const page = async ({ params }: IPageProps) => {
  const rtmpServer =
    process.env.NODE_ENV === "production"
      ? "https://rtmp.youtube.mehuls.in"
      : "http://localhost:7123";

  const data = await prisma.liveStream.findFirst({
    select: {
      rtmpSecretKey: true,
      title: true,
      description: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
    where: {
      id: params.streamId,
    },
  });

  const rtmpSecretKey = data?.rtmpSecretKey;

  const userImage =
    data?.user?.imageUrl ?? "/anonymous-live-stream-profile-img.png";
  const userName = data?.user?.name;

  return (
    <div className="flex flex-col gap-4 p-10 lg:flex-row">
      <div className="h-full w-full rounded-md lg:w-9/12">
        <VideoPlayer
          m3u8Url={`${rtmpServer}/live/${rtmpSecretKey}/index.m3u8`}
          isLive={true}
        />
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              {/* Only 100 chars allowed */}
              {data?.title}
            </h2>
            <h6 className="mt-2 text-xl font-light text-gray-400">
              {data?.description}
              {data?.description}
              {data?.description}
              {data?.description}
            </h6>

            <div className="mt-4 flex items-center gap-2">
              <Image
                src={userImage}
                height={40}
                width={40}
                className="h-10 w-10 rounded-full"
                alt="user image"
              />
              <div>
                <p>{userName ?? "Unverified User"}</p>
                {!userName ? (
                  <CircleAlertIcon className="h-3 w-3 text-yellow-500" />
                ) : (
                  <CheckIcon className="h-3 w-3 text-emerald-500" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <p className="w-max grow text-xl font-normal text-gray-500 underline decoration-dotted underline-offset-2">
              868 watching {/* TODO: fetch from redis */}
            </p>
          </div>
        </div>
      </div>
      <div className="relative h-96 w-full rounded-md bg-black/40 p-2 lg:h-auto lg:w-3/12">
        <LiveChat />
      </div>
    </div>
  );
};

export default page;
