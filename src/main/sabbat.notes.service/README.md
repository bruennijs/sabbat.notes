RETS service of the sabbt notes app.
Listening on port 3000.

Docker
================
cwd is src/main/dist

docker run --rm -t -w /data -v $(pwd):/data -p 3000:3000  bruenni/webapp:14.04-mean node ./sabbat.notes.service/server.js

Ro run in console with blocking + CTRl-C sending SIGTERM
docker run -it --rm -w /data -v $(pwd):/data -p 3000:3000  bruenni/webapp:14.04-mean sh -c 'node ./sabbat.notes.service/server.js'

