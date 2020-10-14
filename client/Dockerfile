FROM node:12.4.0

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY . .

RUN npm install 
RUN yarn install --production


COPY .env.local .

# sanity check for what files were copied over
RUN ls -l


EXPOSE 3000 

CMD [ "npm", "run", "start:prod" ]

USER node