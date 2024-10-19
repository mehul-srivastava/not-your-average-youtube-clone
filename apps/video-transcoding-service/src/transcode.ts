/**
 * youtube prescription about video transcodes: https://support.google.com/youtube/answer/1722171?hl=en#zippy=%2Caudio-codec-aac-lc%2Ccontainer-mp%2Cbitrate%2Cframe-rate
 * 
 * #!/bin/bash
  # Create master.m3u8 file
  echo "#EXTM3U" > master.m3u8
  echo "#EXT-X-VERSION:3" >> master.m3u8

  # Add 144p stream
  echo "#EXT-X-STREAM-INF:BANDWIDTH=144000,RESOLUTION=256x144" >> master.m3u8
  echo "144p/index.m3u8" >> master.m3u8

  # Add 360p stream
  echo "#EXT-X-STREAM-INF:BANDWIDTH=360000,RESOLUTION=640x360" >> master.m3u8
  echo "360p/index.m3u8" >> master.m3u8

  # Add 720p stream
  echo "#EXT-X-STREAM-INF:BANDWIDTH=1280000,RESOLUTION=1280x720" >> master.m3u8
  echo "720p/index.m3u8" >> master.m3u8

 * 
 * save it in a script file and execute it to generate the master.m3u8 and store it in s3 root dir
 * 
 */

import util from "node:util";
import child_process from "node:child_process";
import path from "node:path";
import fs from "node:fs";

import { videoSuperdata, bitrates, paths } from "./config";
import uploadTranscodedVideos from "./upload";

const exec = util.promisify(child_process.exec);
const originFile = path.resolve(paths.origin, videoSuperdata.Key);

async function transcodeVideo() {
  for (const { bitrate, dimensions } of bitrates) {
    const qualityWithPixel = (dimensions.split(":")[1] + "p") as string;
    const destinationFile = prepAndGetDestinationFile(qualityWithPixel);

    const command = getFFmpegCommand(bitrate, dimensions, destinationFile);
    console.log("Transcoding:", qualityWithPixel);

    await exec(command);
  }

  console.log("Transcoding completed");
  await uploadTranscodedVideos();
}

function prepAndGetDestinationFile(quality: string) {
  const destination = paths.destination + quality;

  fs.mkdirSync(destination, { recursive: true });
  return destination;
}

function getFFmpegCommand(
  bitrate: string,
  dimensions: string,
  destinaton: string,
) {
  return `ffmpeg -i ${originFile} -vf scale=${dimensions} -b:v ${bitrate} -b:a 128k -codec:a aac \
    -f hls -hls_time 3 -hls_list_size 0 -hls_segment_filename ${destinaton}/'segment%03d.ts' ${destinaton}/index.m3u8`;
}

export default transcodeVideo;
