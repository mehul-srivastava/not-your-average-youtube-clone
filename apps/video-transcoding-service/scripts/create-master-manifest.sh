#!/bin/bash

# Create master.m3u8 file
echo "#EXTM3U" > transcoded/master.m3u8
echo "#EXT-X-VERSION:3" >> transcoded/master.m3u8

# Add 144p stream
echo "#EXT-X-STREAM-INF:BANDWIDTH=144000,RESOLUTION=256x144" >> transcoded/master.m3u8
echo "144p/index.m3u8" >> transcoded/master.m3u8

# Add 360p stream
echo "#EXT-X-STREAM-INF:BANDWIDTH=360000,RESOLUTION=640x360" >> transcoded/master.m3u8
echo "360p/index.m3u8" >> transcoded/master.m3u8

# Add 720p stream
echo "#EXT-X-STREAM-INF:BANDWIDTH=1280000,RESOLUTION=1280x720" >> transcoded/master.m3u8
echo "720p/index.m3u8" >> transcoded/master.m3u8
