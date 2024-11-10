import React from "react";

const UpcomingFeature = ({ message, upcoming = true }: { message: string; upcoming?: boolean }) => {
  return (
    <div className="flex items-center gap-4 rounded-md bg-gray-800 p-4">
      <div>
        <h5 className="text-lg">
          @admin {upcoming ? "🚀" : "⭐️"}
          {/* <small className="ml-2 text-xs text-gray-500">always</small> */}
        </h5>
        <p className="text-sm font-thin" style={{ fontFamily: "sans-serif" }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default UpcomingFeature;
