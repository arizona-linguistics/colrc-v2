# based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:11

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

# Build, minify, etc.
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
