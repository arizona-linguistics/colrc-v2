# based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:11

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

EXPOSE 4000
CMD [ "node", "app.js" ]
