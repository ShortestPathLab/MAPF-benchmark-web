FROM node:lts-slim

COPY . /src

WORKDIR /src/server

RUN npm run build

CMD ["node", "server.js"]
