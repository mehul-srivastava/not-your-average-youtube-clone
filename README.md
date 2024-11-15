# System Design
![system design](https://github.com/mehul-srivastava/not-your-average-youtube-clone/raw/refs/heads/main/system-design.png)

# Tasks
## Urgent
- cleanup all apps/packages (transfer packages to main package.json, optimize turborepo)
- switch to esbuild (100x faster builds than tsc)
- setup entire infra on terraform
- purpose of tubrorepo is defeated (fix this)

## Small Fix
- recommendation section (right side) shows NaNM views when it is zero
- change links to prod -> make this dynamic to get rid of manual changes
- live stream status is not getting updated
- fix live stream view count (big update)

## Extras
- setup jenkins
- pinecone recommendation system
- setup prom. grafana
- shift queries to apis and mutations to server actions
- clean up entire codebase
- make a package for types
- dockerise app
- elk search
- add cassandra

# Track Metrics!
- Total comments posted
- Total views across all videos
- Total live streams created
- Total live stream chats
- Total users (loggedin + guest)
