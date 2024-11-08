"use client";

import React from "react";
import "video.js/dist/video-js.css";

import useVideoPlayer from "@/hooks/useVideoPlayer";

interface IVideoPlayerProps {
  isLive: boolean;
  m3u8Url: string;
  poster: string;
}

const LiveStreamPlayer = ({ isLive, m3u8Url, poster }: IVideoPlayerProps) => {
  const { vidRef } = useVideoPlayer(isLive, m3u8Url, poster);

  return (
    <div data-vjs-player>
      <video ref={vidRef} className="video-js vjs-default-skin vjs-big-play-centered w-full" controls width={600} height={600} loop={false} preload="auto" poster={poster} data-setup="">
        <source src={m3u8Url} type="application/x-mpegURL" />
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

export default LiveStreamPlayer;
