"use client";

import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import * as _ from "videojs-contrib-quality-levels";
import { useSearchParams } from "next/navigation";
// @ts-ignore
import qualitySelector from "videojs-hls-quality-selector";

interface IVideoPlayerProps {
  isLive: boolean;
  m3u8Url: string;
  poster: string;
}

const VideoPlayer = ({ isLive, m3u8Url, poster }: IVideoPlayerProps) => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const searchParams = useSearchParams();

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

    return () => {
      if (p) p.dispose();
    };
  }, [isLive]);

  useEffect(() => {
    if (player) {
      // Update source and poster when search params change
      const videoId = searchParams.get("v");
      if (videoId) {
        const newSource = `${m3u8Url}?v=${videoId}`;
        player.src({ src: newSource, type: "application/x-mpegURL" });
        if (poster) {
          player.poster(poster);
        }
      }

      if (!isLive) {
        // @ts-ignore
        player.hlsQualitySelector({ displayCurrentQuality: true });
      }
    }
  }, [searchParams, player, m3u8Url, poster, isLive]);

  return (
    <div data-vjs-player>
      <video
        ref={vidRef}
        className="video-js vjs-default-skin vjs-big-play-centered w-full"
        controls
        width={600}
        height={600}
        loop={false}
        preload="auto"
        poster={poster}
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
