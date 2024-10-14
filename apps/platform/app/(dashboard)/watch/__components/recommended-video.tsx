import React from "react";

const RecommendVideo = () => {
  return (
    <div className="flex w-full cursor-pointer gap-2 rounded-md p-1 transition-all duration-200 hover:bg-slate-900">
      <div className="min-h-[100px] min-w-[150px] rounded-md bg-[url(https://random.imagecdn.app/300/160)] bg-cover bg-no-repeat" />
      <div className="flex h-full flex-col justify-between">
        <div>
          <h3 className="text-base leading-tight">
            Shubh - Still Rollin (Official Music Video)
          </h3>
          <p className="mt-1 text-sm text-gray-400">Aman Rathor</p>
        </div>
        <small className="text-gray-500">1023 views • 7 months ago</small>
      </div>
    </div>
  );
};

export default RecommendVideo;
