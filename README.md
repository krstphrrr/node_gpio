# Set up

Node backend that controls GPIO pins on a remote raspberry pi ubuntu server through an angular app. Uses docker compose to deploy: the node app,
a mongo db, and a mongo-express dashboard. the angular client is in another repo, but essentially sends restful requests to this backend (
https:// api.website.com/red/1  etc. ) 

