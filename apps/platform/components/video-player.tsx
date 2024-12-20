"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "video.js/dist/video-js.css";

import axiosInstance from "@/lib/axios";
import useVideoPlayer from "@/hooks/useVideoPlayer";
import { checkIfFullyVisible } from "@/utils/video";
import toast from "react-hot-toast";

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
    try {
      await axiosInstance.patch("/artifacts/update/watch-count", { id: searchParams.get("v") });
      toast.success("This video just gained a view!");
    } catch {
      toast.error("Something went wrong while evaluating your view!");
    }
  }

  // Condition 1: Setup observer and event listener for video element to make sure it is visible all the time
  useEffect(() => {
    let observer: IntersectionObserver;

    if (vidRef.current && player) {
      observer = checkIfFullyVisible(vidRef.current, setVisibility);

      if (player.hasStarted_) {
        window.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") player.pause();
          else player.play();
        });
        visibility ? player.play() : player.pause();
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("visibilitychange", () => {});
    };
  }, [vidRef, player, visibility]);

  // Condition 2: If user is seeking, stop the interval
  // Condition 3: Take this interval timer upto 40% of total video duration
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (player) {
      if (secondsPassed >= Math.floor(duration * 0.4) && !player.ended() && !hasWatchedTheVideo) {
        updateViewCount();
        setHasWatchedTheVideo(() => true);
      }

      intervalId = setInterval(() => {
        if (!player.paused() && !player.seeking()) {
          setSecondsPassed((p) => ++p);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [vidRef, player, secondsPassed]);

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
