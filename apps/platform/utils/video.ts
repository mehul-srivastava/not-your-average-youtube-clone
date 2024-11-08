import React from "react";

export const checkIfFullyVisible = (videoElement: HTMLVideoElement, setVisibility: React.Dispatch<React.SetStateAction<boolean>>) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          setVisibility(() => true);
        } else {
          setVisibility(() => false);
        }
      });
    },
    {
      root: null,
      threshold: 1.0,
    },
  );

  observer.observe(videoElement);
  return observer;
};
