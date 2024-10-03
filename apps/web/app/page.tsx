import React from "react";

const page = () => {
  return (
    <div className="m-8">
      <div className="grid grid-cols-5 gap-4">
        {Array.from(new Array(13)).map((item) => (
          <div key={item} className="rounded-md border cursor-pointer shadow-sm">
            <div className="bg-gray-400 h-32 rounded-t-[inherit]" />
            <div className="p-4">
              <h6 className="text-lg">Title of the video</h6>
              <p className="text-xs">Description of the video</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
