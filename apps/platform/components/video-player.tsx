"use client";
import React, { useEffect, useRef } from "react";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaLiveButton,
  MediaPosterImage,
} from "media-chrome/react";
import "hls-video-element";
import { useSearchParams } from "next/navigation";

interface IVideoPlayerProps {
  isLive: boolean;
  m3u8Url: string;
  poster?: string;
}

const VideoPlayer = ({ isLive, m3u8Url, poster }: IVideoPlayerProps) => {
  const mediaRef = useRef();
  const searchParams = useSearchParams();

  useEffect(() => {
    // @ts-ignore
    mediaRef.current.load();
  }, [searchParams.get("v")]);

  return (
    <MediaController>
      {/* @ts-ignore */}
      <hls-video
        suppressHydrationWarning
        ref={mediaRef}
        slot="media"
        src={m3u8Url}
        preload="auto"
        crossOrigin=""
      />
      <MediaPosterImage slot="poster" src={poster}></MediaPosterImage>
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaMuteButton></MediaMuteButton>
        {isLive && <MediaLiveButton></MediaLiveButton>}
        {!isLive && (
          <>
            <MediaSeekBackwardButton></MediaSeekBackwardButton>
            <MediaSeekForwardButton></MediaSeekForwardButton>
          </>
        )}
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay showDuration></MediaTimeDisplay>
      </MediaControlBar>
    </MediaController>
  );
};

export default VideoPlayer;
