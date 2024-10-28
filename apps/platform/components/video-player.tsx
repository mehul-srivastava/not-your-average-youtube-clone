"use client";
import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";

// @ts-ignore
import qualitySelector from "videojs-hls-quality-selector";
import * as _ from "videojs-contrib-quality-levels";

interface IVideoPlayerProps {
  isLive: boolean;
  m3u8Url: string;
  poster?: string;
}

const VideoPlayer = ({ isLive, m3u8Url, poster }: IVideoPlayerProps) => {
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

  useEffect(() => {
    if (player && poster) {
      player.poster(poster);
    }
  }, [player, poster]);

  return (
    <div data-vjs-player>
      <video
        id="my-player"
        ref={vidRef}
        className="video-js vjs-default-skin vjs-big-play-centered w-full"
        controls
        width={600}
        height={600}
        loop={false}
        preload="auto"
        poster={poster} // have to change poster
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
