import NodeMediaServer from "node-media-server";

const APP_NAME = "live";

const httpConfig = {
  port: 7123,
  allow_origin: "*",
  mediaroot: "./media",
};

const rtmpConfig = {
  port: 1935,
  chunk_size: 60000,
  gop_cache: true,
  ping: 10,
  ping_timeout: 60,
};

const transConfig = {
  ffmpeg: "./ffmpeg",
  tasks: [
    {
      app: APP_NAME,
      hls: true,
      hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
      hlsKeep: false,
    },
  ],
  MediaRoot: "./media",
};

const config = {
  http: httpConfig,
  rtmp: rtmpConfig,
  trans: transConfig,
};

const rtmpServer = new NodeMediaServer(config);
rtmpServer.run();
