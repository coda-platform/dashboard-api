FROM node:16.3.0-alpine

ENV PM2_HOME="/home/node/app/.pm2"

WORKDIR /usr/src/app
COPY ./ ./

# Build the app
RUN apk --no-cache add git
RUN git submodule update --init --recursive
RUN npm ci
RUN npm run build

# Make build footprint version for easier debugging.
RUN apk add openssl
RUN rm ./version.txt
RUN openssl rand -hex 12 > version.txt

# Install local packages for running server.
RUN npm install dotenv
RUN npm install pm2 -g

# Make app run on lower priviledge user for openshift.
USER root
RUN chmod -R 775 /usr/src/app/dist
RUN chown -R 1000:root /usr/src/app/dist
USER 1000

EXPOSE 3000
CMD ["pm2-runtime","dist/src/server.js"]