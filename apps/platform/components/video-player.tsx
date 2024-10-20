"use client";
import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";

// @ts-ignore
import qualitySelector from "videojs-hls-quality-selector";
import * as hell from "videojs-contrib-quality-levels";

interface IVideoPlayerProps {
  isLive: boolean;
  m3u8Url: string;
}

const VideoPlayer = ({ isLive, m3u8Url }: IVideoPlayerProps) => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  let customControlAdded = false;

  useEffect(() => {
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      liveui: isLive,
      enableSmoothSeeking: true,
      fluid: true,
      responsive: true,
      playbackRates: [0.5, 1.0, 1.5, 2.0],
    };

    videojs.registerPlugin("hlsQualitySelector", qualitySelector);

    const p = videojs(vidRef.current!, videoJsOptions);
    setPlayer(p);

    if (isLive && !customControlAdded) {
      p.getChild("ControlBar")!.addChild(
        "button",
        { className: "vjs-live-icon" },
        4,
      );
      customControlAdded = true;
    }
    return () => {
      if (player) player.dispose();
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (player) player.hlsQualitySelector({ displayCurrentQuality: true });
  }, [player]);

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
        poster="//vjs.zencdn.net/v/oceans.png" // have to change poster
        data-setup=""
      >
        <source src={m3u8Url} type="application/x-mpegURL" />
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
