"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "video.js/dist/video-js.css";

import useVideoPlayer from "@/hooks/useVideoPlayer";
import { checkIfFullyVisible } from "@/utils/video";
import Player from "video.js/dist/types/player";
import axios from "axios";

interface IVideoPlayerProps {
  isLive: boolean;
  m3u8Url: string;
  poster: string;
}

const VideoPlayer = ({ isLive, m3u8Url, poster }: IVideoPlayerProps) => {
  const { player, vidRef, duration } = useVideoPlayer(isLive, m3u8Url, poster);

  const [visibility, setVisibility] = useState(false);
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [hasWatchedTheVideo, setHasWatchedTheVideo] = useState(false);

  const searchParams = useSearchParams();

  async function updateViewCount() {
    await axios.post("http://localhost:3000/api/watch", { id: searchParams.get("v") });
  }

  // Condition 1: Setup observer for video element to make sure it is visible all the time
  // Condition 2: If user is seeking, set time to 0
  useEffect(() => {
    let observer: IntersectionObserver;

    if (vidRef.current && player) {
      observer = checkIfFullyVisible(vidRef.current, setVisibility);

      player.on("seeking", function () {
        setSecondsPassed(0);
      });

      visibility ? player.play() : player.pause();
    }

    return () => observer && observer.disconnect();
  }, [vidRef, player, visibility]);

  // Condition 3: Take this interval timer upto 40% of total video duration
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (player) {
      if (secondsPassed >= Math.floor(duration * 0.4) && !player.ended() && !hasWatchedTheVideo) {
        updateViewCount();
        setHasWatchedTheVideo(() => true);
      }

      intervalId = setInterval(() => {
        if (!player.paused()) {
          setSecondsPassed((p) => ++p);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [vidRef, player, secondsPassed]);

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

export default VideoPlayer;
