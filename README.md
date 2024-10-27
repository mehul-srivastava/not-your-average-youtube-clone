# Improvements

- check the entire flow again
- cleanup directories and code (processor, transcoder and platform)

CURRENT TASKS
- live chat implementation (redis, ws, must be logged in) + show stream created at date
- heavily test live streaming and chatting
- when stream is over, rtmp server sends a request to webhook to update "isFinished" field
- show only isFinished false streams in home page
- no more than 3 streams at a time rated by most recent
- click on streams to display all of them
- if a user goes on live stream that is finished then redirect back to homepage + any invalid key then also redirect

- fetch all videos uploaded (using prisma)
- when on watch page, view video (PRIMARY FEATURE)
- fetch comments using scroll loading + same way for recommended videos
- cannot comment, cannot like/dislike, cannot subscribe (redirect to login)
- comment feature, subscribe feature
- like/dislike feature no batch processing but do set the condition for 300, after that comment todo kafka)

- sidebar, go to liked videos and get liked videos
- go to dashboard and see uploaded videos (only show uploaded videos for now and redirect to watch page)
- display most recent 5 subscriptions on the left


LATER
- subscription feature
- fetch all videos for now + on the side as well (later recommendation system, add the surprise feature coming soon thing)
- Rest of the features coming up soon - Terraform, Jenkins blah blah