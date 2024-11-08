### Fix
- terraform setup
- when uploading video, dialog should appear for metadata
- track video upload progress across services (in REDIS)
- when stream is over, rtmp server sends a request to webhook to update "isFinished" field (honojs)
- minor bugs here/there - mainly like.dislike.subscribe
- leave space for kafka in like-dislike api


### Later
- setup jenkins
- setup prom. grafana
- elk stack search
- pinecone recommendation
- add cassandra
- fix live stream view count (big update)


### Metrics
- Total comments posted?
- Total views across all videos?
- Total live streams created?
- Total live stream chats?
- Total users (loggedin + guest)?