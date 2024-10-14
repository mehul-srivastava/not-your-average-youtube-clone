"use client";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  isLive: boolean;
  m3u8Url: string;
}

const VideoPlayer = ({ isLive, m3u8Url }: IVideoPlayerProps) => {
  const vidRef = useRef<HTMLVideoElement>(null);
  let customControlAdded = false;

  useEffect(() => {
    if (vidRef.current) {
      const player = videojs(vidRef.current!, {
        controls: true,
        liveui: true,
        autoplay: true,
        preload: "auto",
        techOrder: ["html5"],
        sources: [
          {
            src: m3u8Url,
            // type: "application/x-mpegURL",
            type: "video/mp4",
          },
        ],
      });

      if (isLive && !customControlAdded) {
        player
          .getChild("ControlBar")!
          .addChild("button", { className: "vjs-live-icon" }, 4);
        customControlAdded = true;
      }
    }
  }, []);

  return (
    <div id="otnansirk-video-player-wrapper">
      <div data-vjs-player>
        <video
          id="my-player"
          ref={vidRef}
          className="video-js vjs-default-skin vjs-big-play-centered w-full"
          controls
          width={640}
          height={800}
          loop={false}
          preload="auto"
          poster="//vjs.zencdn.net/v/oceans.png"
          data-setup=""
        >
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading
            to a web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank">
              supports HTML5 video
            </a>
          </p>
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
