"use client";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = () => {
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
            // src: "https://assets7.ign.com/master/videos/zencoder/2019/06/11/,640/d3e7aa2687f580e185c47f9288ccd139-347000,853/d3e7aa2687f580e185c47f9288ccd139-724000,960/d3e7aa2687f580e185c47f9288ccd139-1129000,1280/d3e7aa2687f580e185c47f9288ccd139-1910000,1920/d3e7aa2687f580e185c47f9288ccd139-3906000,-1560300082/master.m3u8",
            // type: "application/x-mpegURL",
            src: "https://vjs.zencdn.net/v/oceans.mp4",
            type: "video/mp4",
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
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
    </div>
  );
};

export default VideoPlayer;
