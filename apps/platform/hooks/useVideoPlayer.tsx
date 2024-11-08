"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import * as _ from "videojs-contrib-quality-levels";
// @ts-ignore
import qualitySelector from "videojs-hls-quality-selector";

const useVideoPlayer = (isLive: boolean, m3u8Url: string, poster: string) => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const searchParams = useSearchParams();
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (player) {
      const videoId = searchParams.get("v");
      if (videoId) {
        player.src({ src: m3u8Url, type: "application/x-mpegURL" });
        if (poster) player.poster(poster);
      }

      if (!isLive) {
        // @ts-ignore
        player.hlsQualitySelector({ displayCurrentQuality: true });
      }
    }
  }, [player, searchParams, m3u8Url]);

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

  return { player, vidRef };
};

export default useVideoPlayer;
