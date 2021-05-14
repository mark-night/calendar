FROM --platform=linux/amd64  node:erbium-alpine
LABEL io.meetm.app="calendar" release="20210515" maintainer="Mark Ye <mark@meetm.io>"

WORKDIR /app
COPY . .
RUN npm install --production

EXPOSE 80

CMD "node ."