/**
 * youtube prescription about video transcodes: https://support.google.com/youtube/answer/1722171?hl=en#zippy=%2Caudio-codec-aac-lc%2Ccontainer-mp%2Cbitrate%2Cframe-rate
 */

import util from "node:util";
import child_process from "node:child_process";
import path from "node:path";
import fs from "node:fs";

import { videoSuperdata, bitrates, paths } from "./config.js";
import uploadTranscodedVideos from "./upload.js";

const exec = util.promisify(child_process.exec);

const originFile = path.resolve(paths.origin, videoSuperdata.Key);
const masterManifestExecCmd = path.resolve("scripts", "create-master-manifest.sh");

async function transcodeVideo() {
  for (const { bitrate, dimensions } of bitrates) {
    const qualityWithPixel = dimensions.split(":")[1] + "p";
    const destinationFile = prepAndGetDestinationFile(qualityWithPixel);

    const command = getFFmpegCommand(bitrate, dimensions, destinationFile);
    console.log("Transcoding:", qualityWithPixel);

    await exec(command);
  }

  console.log("Transcoding completed");

  await exec(`sh ${masterManifestExecCmd}`);
  console.log("master.m3u8 added to destination directory");

  await uploadTranscodedVideos();
}

function prepAndGetDestinationFile(quality) {
  const destination = paths.destination + quality;

  fs.mkdirSync(destination, { recursive: true });
  return destination;
}

function getFFmpegCommand(bitrate, dimensions, destinaton) {
  return `ffmpeg -i ${originFile} -vf scale=${dimensions} -b:v ${bitrate} -b:a 128k -codec:a aac \
    -f hls -hls_time 3 -hls_list_size 0 -hls_segment_filename ${destinaton}/'segment%03d.ts' ${destinaton}/index.m3u8`;
}

export default transcodeVideo;
