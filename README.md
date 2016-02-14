# Sabbat - A high available private cloud application

=====================================================

Why this project?
-----------------
This project is up front a project for applying DDD patterns and use new technical frameworks needed to engineer high available distributed applications scaling horizontally.
Learning of new technical frameworks like rabbitmq, typescript, nodejs, mongodb, angular js for client side, typescript/javascript and nodejs.
A bounded context to store binary files in blobs implemented in .Net (dotnet core or .net 4.5) in language C# is planned. This seriuce stores data in webdav repositories.

What is implemented?
--------------------
Implement a private cloud for sending messages, storing files, notes for sharing with a community. Users can host the software in hoome servers hosting the softwar in docker containers.
Several nodes can be connected to a logical private cloud and communicating with each other. The purpouse is the failure and offline state of several nodes and transparent use of the application functionality to the user.


More deep description
--------------------
A project for high available private cloud. A RESTful API facing a middleware hosted in docker containers. A distrubuted application communicating via rabbitmq to multiple notes of same type.
The backend is an mongodb database with one master and multiple slaves.

The whole application is driven by private server hardware and public (e.g. digital ocean PaaS platforms) for hosting:
1) NGINX for load balancing
2) RabbitMQ for distributed communication of the nodes

Main use cases are:
1) Storinig of personal notes to be shared
2) Messaging via mobile devices (Angular JS application)

=====================================================
Deployment

New release builds are deployed in docker hub https://hub.docker.com/r/bruenni/sabbat/app
Run
* docker run -it -d -p 8081:8081 --link mongo:mongolink bruenni/sabbat:app.latest

Build
* docker build -t bruenni/sabbat:app.latest .

Pull
* docker pull bruenni/sabbat:app.latest

Push
* docker push bruenni/sabbat:app.latest

OR...
To run & build the application and its dependent servers (e.g. mongo) docker-compose v1.5.2 is used
* <root_directory>/docker-compose up

See details for docker composehttps://docs.docker.com/compose/install

Run in mean stack
* cd root of project
* docker run -it --rm -p 8081:8081 --link mongo:mongolink -v $(pwd)/dist:/www bruenni/sabbat:app.latest sh -c 'node /www/rest/server.js'

=====================================================
Installation
* cd src/main/sabbat.notes.app
** npm install
** node_modules/.bin/tsd reinstall
** install additional packages (will extend typings/tsd.d.ts file):node_modules/.bin/tsd install rx --save

=====================================================
Documentation
* For application documentation see UMLs containing erms, domain models, sequence diagrams, state diagrams, use case views
  in src/main/sabbat.notes.app/documentation
* Deployment view
** tbd

=====================================================

REST API

/users/create
* content-type: application/json
* query parameters: name=<username, email=<address>
* request: curl -X POST -d "name=testuser" -v "http://localhost:3000/users/create?name=user1&email=some@gmx.de"

/login: login with BASIC authentication
* Request: Authorization: Basic name:pwd
* Response is JSON web token in body: curl -X POST -u testuser:mypassword -v "http://localhost:8081/login" > ~/.jwt

/login/whoami
* Authorization: Bearer <JWT_TOKEN_RETURNED_FROM_LOGIN>
* curl -X POST -H "Authorization: Bearer $(cat ~/.jwt)" -v "http://localhost:8081/login/whoami"

* Response: json object with {id, name}

/messages
* Message can be sent from user to one different user by name.
** curl -X POST -d "name=testuser" -v "http://localhost:3000/messages/send?name=user1&email=some@gmx.de"

/messages/notification
* Clients can connect to the server by websocket (RFC 6455, protocol version 13).Initial http upgrade request must contain a Authorization header (see /login) conatining the json web token.
* wscat is a command line tool in js/node.
** node node_modules/wscat/bin/wscat -H "Authorization: Bearer $(cat ~/.jwt)" -c ws://127.0.0.1:8081/messages/notification

=====================================================
Database
To run the application an mongo db 3.0.x is needed. For this use mongodb from docker hub
* docker pull bruenni/mongo

Run mongodb instance
* docker run --name mongo -d -p 27017:27017 -p 28017:28017 bruenni/webapp:mongo

=====================================================

Test

* run unit tests with linked mongo db instance
  docker run --rm -w /usr/local/share/sabbat --link mongo:mongolink -v /usr/local/src/git/sabbat.notes/src/main/sabbat.notes.app:/usr/local/share/sabbat bruenni/webapp:14.04-mean  node ./node_modules/gulp/bin/gulp.js test

Todos managed in trello
* https://trello.com/b/UKLb1n2w

======================================
CoreOS

make VMware configdrive with cloud-config.yaml
 mkdir -p /tmp/new-drive/openstack/latest
 cp cloud-config.yaml /tmp/new-drive/openstack/latest/user_data
 mkisofs -R -V config-2 -o configdrive.iso /tmp/new-drive
 rm -r /tmp/new-drive
