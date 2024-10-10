/**
 * what youtube prescribes: https://support.google.com/youtube/answer/1722171?hl=en#zippy=%2Caudio-codec-aac-lc%2Ccontainer-mp%2Cbitrate%2Cframe-rate
 * command: ffmpeg -i pw.mp4 -b:v 128k -b:a 128k -codec:a aac output128.mp4
 * hls command: ffmpeg -i pw.mp4 -b:v 128k -b:a 128k -codec:a aac -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename 'segment%03d.ts' output.m3u8
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
    `ffmpeg -i ${originFile} -b:v ${bitrate} -b:a 128k -codec:a aac ${destinationFile} && ` +
    `ffmpeg -i ${destinationFile} -f hls -hls_time 3 -hls_list_size 0 -hls_segment_filename ${paths.destination}${quality}/'segment%03d.ts' ${paths.destination}${quality}/index.m3u8`
  );
}

export default transcodeVideo;
