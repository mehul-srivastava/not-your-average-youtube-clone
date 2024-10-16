# Improvements

- check the entire flow again
- cleanup directories and code (processor, transcoder and platform)

STEPS (Watch Videos)
- first connect postgres (add dummy data using prisma studio)
- fetch all videos for now (later recommendation system, add the surprise feature coming soon thing)
- finish watch mechanism (user clicks on home page video -> specific watch page -> video is being streamed)
- fetch all videos on the side for now (later recommendation system)

STEPS (Live Stream)
- add data to postgres 
- hit express server and send live stream url
- spin up rtmp server on that url
- go to live stream url page (ui done alr) and get stream using the same URL
- display all active streams on the homepage (later: only subscribed people)

Rest of the features coming up soon - Redis, Kafka, Terraform blah blah