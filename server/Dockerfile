FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY server/package.json ./
COPY server/yarn.lock ./

# sanity check for what files were copied over
RUN ls -l

RUN yarn

COPY server/. ./

# sanity check for what files were copied over
RUN ls -l

RUN yarn build

ENV NODE_ENV production

# possible implement, but probably needs to trash
# WORKDIR /usr/src/app/dist

EXPOSE 3000 
CMD [ "node", "dist/index.js" ]
USER node