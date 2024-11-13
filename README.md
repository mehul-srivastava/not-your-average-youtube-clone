# Urgent
- cleanup all apps/packages (transfer packages to main package.json, optimize turborepo)
- switch to esbuild (100x faster builds than tsc)
- setup entire infra on terraform

# Small Fix
- recommendation section (right side) shows NaNM views when it is zero
- fetch does not work on rtmp server or ecs container
- live stream is stuck at not started even though it works

### Work on
- setup jenkins
- pinecone recommendation system
- setup prom. grafana
- shift queries to apis and mutations to server actions
- clean up entire codebase
- make a package for types
- dockerise app
- elk search
- add cassandra
- fix live stream view count (big update)

### Track Metrics!
- Total comments posted
- Total views across all videos
- Total live streams created
- Total live stream chats
- Total users (loggedin + guest)