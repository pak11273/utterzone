FROM node:12.4.0 

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY . .

RUN yarn install --production

RUN ls -al

COPY ormconfig.docker.js ./ormconfig.js

EXPOSE 4000

CMD node dist/index.js