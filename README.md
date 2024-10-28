# Improvements
- CLEANUP CODE + ONLY GET REQUESTS ON API, REST SHOULD BE SERVER ACTIONS (server components doing directly, client using react query)
- fetch comments using scroll loading + same way for recommended videos
- actual comment feature (no kafka processing)
- like/dislike feature no batch processing but do set the condition for 300, after that comment todo kafka
- WATCH FEATURE COMPLETE POLISHING


### Later
- live chat implementation (redis, ws, must be logged in) + show stream created at date
- heavily test live streaming and chatting
- when stream is over, rtmp server sends a request to webhook to update "isFinished" field
- show only isFinished false streams in home page
- no more than 3 streams at a time rated by most recent
- click on streams to display all of them
- if a user goes on live stream that is finished then redirect back to homepage + any invalid key then also redirect

- sidebar, go to liked videos and get liked videos
- go to dashboard and see uploaded videos (only show uploaded videos for now and redirect to watch page)
- display most recent 5 subscriptions on the left


LATER
- subscription feature
- fetch all videos for now + on the side as well (later recommendation system, add the surprise feature coming soon thing)
- Rest of the features coming up soon - Terraform, Jenkins blah blah