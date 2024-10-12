/**
 * what youtube prescribes: https://support.google.com/youtube/answer/1722171?hl=en#zippy=%2Caudio-codec-aac-lc%2Ccontainer-mp%2Cbitrate%2Cframe-rate
 * command: ffmpeg -i pw.mp4  -b:v 128k -b:a 128k -codec:a aac output128.mp4
 * hls command: ffmpeg -i pw.mp4 -b:v 128k -b:a 128k -codec:a aac -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename 'segment%03d.ts' output.m3u8
 * 
 * #!/bin/bash
  # Create master.m3u8 file
  echo "#EXTM3U" > master.m3u8
  echo "#EXT-X-VERSION:3" >> master.m3u8

  # Add 144p stream
  echo "#EXT-X-STREAM-INF:BANDWIDTH=144000,RESOLUTION=256x144" >> master.m3u8
  echo "144p/144p.m3u8" >> master.m3u8

  # Add 360p stream
  echo "#EXT-X-STREAM-INF:BANDWIDTH=360000,RESOLUTION=640x360" >> master.m3u8
  echo "360p/360p.m3u8" >> master.m3u8

  # Add 720p stream
  echo "#EXT-X-STREAM-INF:BANDWIDTH=1280000,RESOLUTION=1280x720" >> master.m3u8
  echo "720p/720p.m3u8" >> master.m3u8

 * 
 * save it in a script file and execute it to generate the master.m3u8 and store it in s3 root dir
 * 
 * remove env vars if it is possible to do ops without them
 * 
 */

import util from "node:util";
import child_process from "node:child_process";
import path from "node:path";
import fs from "node:fs";

import { args, bitrates, paths } from "./config";
import uploadTranscodedVideos from "./upload";

const exec = util.promisify(child_process.exec);

async function transcodeVideo() {
  const originFile = path.resolve(paths.origin, args.Key);

  for (const { bitrate, quality } of bitrates) {
    const destinationFile = prepAndGetDestinationFile(quality);
    console.log("Prepping directory:", quality);

    const command = getFFmpegCommand(originFile, bitrate, quality, destinationFile);
    console.log("Transcoding:", quality);

    await exec(command);
  }

  console.log("Transcoding completed");
  await uploadTranscodedVideos();
}

function prepAndGetDestinationFile(quality: string) {
  fs.mkdirSync(paths.destination + quality, { recursive: true });
  return paths.destination + quality + "/" + `${args.Key.slice(0, -4)}-${quality}.mp4`;
}

function getFFmpegCommand(
  originFile: string,
  bitrate: string,
  quality: string,
  destinationFile: string
) {
  return (
    `ffmpeg -i ${originFile} -vf "scale=-2:${quality}" -b:v ${bitrate} -b:a 128k -codec:a aac ${destinationFile} && ` +
    `ffmpeg -i ${destinationFile} -f hls -hls_time 3 -hls_list_size 0 -hls_segment_filename ${paths.destination}${quality}/'segment%03d.ts' ${paths.destination}${quality}/index.m3u8`
  );
}

export default transcodeVideo;
