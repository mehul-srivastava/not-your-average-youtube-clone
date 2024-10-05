/**
 * what youtube prescribes: https://support.google.com/youtube/answer/1722171?hl=en#zippy=%2Caudio-codec-aac-lc%2Ccontainer-mp%2Cbitrate%2Cframe-rate
 * command: ffmpeg -i pw.mp4 -b:v 128k -b:a 128k -codec:a aac output128.mp4
 */

import util from "node:util";
import child_process from "node:child_process";
import path from "node:path";

import { params } from "./config";
import uploadTranscodedVideos from "./upload";

const exec = util.promisify(child_process.exec);

async function transcodeVideo() {
  const originalVideo = path.resolve(__dirname, "../raw/", params.Key);

  const bitrates = [
    { quality: "360p", bitrate: "1.5M" },
    { quality: "480p", bitrate: "4M" },
    { quality: "720p", bitrate: "7.5M" },
  ];

  for (const { bitrate, quality } of bitrates) {
    const command = `ffmpeg -i ${originalVideo} -b:v ${bitrate} -b:a ${bitrate} -codec:a aac transcoded/${params.Key.slice(0, params.Key.length - 4)}-${quality}.mp4`;

    console.log("Transcoding:", quality);
    await exec(command);
  }

  console.log("Transcoding completed");

  uploadTranscodedVideos();
}

export default transcodeVideo;
