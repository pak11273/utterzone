FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY client/package.json ./
COPY client/yarn.lock ./

RUN yarn

COPY client/. .
COPY client/.env.production .env

# sanity check for what files were copied over
RUN ls -l

RUN yarn build

ENV NODE_ENV production

EXPOSE 5000 
CMD [ "node", "dist/index.js" ]
USER node