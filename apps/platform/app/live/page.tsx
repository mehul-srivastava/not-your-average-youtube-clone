"use client";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "@videojs/http-streaming";
import "video.js/dist/video-js.css";

const page = () => {
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
            src: "http://localhost:7123/live/youtube-clone/index.m3u8",
            type: "application/x-mpegURL",
          },
        ],
      });

      if (!customControlAdded) {
        const controlBar = player.getChild("ControlBar");
        controlBar?.addChild("button", { className: "vjs-live-icon" }, 4);

        customControlAdded = true;
      }
    }
  }, []);

  return (
    <div data-vjs-player>
      <video
        id="my-player"
        ref={vidRef}
        className="video-js vjs-default-skin vjs-big-play-centered"
        controls
        width={640}
        loop={false}
        preload="auto"
        poster="//vjs.zencdn.net/v/oceans.png"
        data-setup=""
      >
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
    </div>
  );
};

export default page;
