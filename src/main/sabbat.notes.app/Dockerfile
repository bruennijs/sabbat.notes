#
# Installing tools to run & build web applications written in Javascript / Typescript
#
FROM bruenni/webapp:14.04-mean
MAINTAINER Oliver Brüntje "oliver.bruentje@gmx.de"

RUN useradd -G users server

# ============= application ===============
COPY ./dist /www
VOLUME /www
EXPOSE 8081
# ============= appplication ===============

USER server

CMD ["node", "/www/rest/server.js"]