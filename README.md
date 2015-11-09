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

* /login: login with BASIC authentication
** Request
*** Authorization: Basic name:pwd
** Response is JSON web token in body
** curl -X POST -u testuser:mypassword -D /dev/pts/2 http://localhost:3000/login > ~/.jwt

* /login/whoami
** Request
*** Authorization: Bearer <JWT_TOKEN_RETURNED_FROM_LOGIN>
*** curl -X POST -H "Authorization: Bearer $(cat ~/.jwt)" -D /dev/pts/2 http://localhost:3000/login/whoami
** Response
*** json object with {id, name}


Todos managed in trello
* https://trello.com/b/UKLb1n2w
