# sabbat.notes

Purpouses
Implement a private cloud for sending messages, storing files, notes for sharing with a community. Participants can be invited per email.

Installation
* cd src/main/sabbat.notes.app
** npm install
** node_modules/.bin/tsd reinstall
** install additional packages (will extend typings/tsd.d.ts file):node_modules/.bin/tsd install rx --save

Documentation
* For application documentation see UMLs containing erms, domain models, sequence diagrams, state diagrams, use case views
  in src/main/sabbat.notes.app/documentation
* Deployment view
** tbd

REST API

/user/create
* content-type: application/json
* query parameters: name=<username, email=<address>
* request: curl -X POST -d "name=testuser" -v "http://localhost:3000/user/create?name=user1&email=some@gmx.de"

/login: login with BASIC authentication
* Request: Authorization: Basic name:pwd
* Response is JSON web token in body: curl -X POST -u testuser:mypassword -v "http://localhost:3000/login" > ~/.jwt

/login/whoami
* Authorization: Bearer <JWT_TOKEN_RETURNED_FROM_LOGIN>
* curl -X POST -H "Authorization: Bearer $(cat ~/.jwt)" -v "http://localhost:3000/login/whoami"

* Response: json object with {id, name}

Test
* run mongo db instance
  docker run --name mongo -d -p 27017:27017 -p 28017:28017 bruenni/webapp:mongo

* run unit tests with linked mongo db instance
  docker run --rm -w /usr/local/share/sabbat --link mongo:mongolink -v /usr/local/src/git/sabbat.notes/src/main/sabbat.notes.app:/usr/local/share/sabbat bruenni/webapp:14.04-mean  node ./node_modules/gulp/bin/gulp.js test


Todos managed in trello
* https://trello.com/b/UKLb1n2w
