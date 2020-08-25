# Production Build

# Stage 1: Build React client
FROM node:latest as builder

# Working Directory
RUN mkdir -p /usr/app/client
WORKDIR /usr/app/client

# Install dependencies
COPY client/package*.json ./
RUN npm ci

# copy local files to app folder
COPY client/ ./
# Build
RUN npm run build

# Stage 2: Build Nginx Server
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/app/client/build /usr/share/nginx/html

EXPOSE 80

RUN chown nginx.nginx /usr/share/nginx/html. -R

# Stage 2: Build Server
FROM node:latest

RUN mkdir -p /usr/app/server
WORKDIR /usr/app/server

# Install dependencies
COPY server/package*.json ./
RUN npm ci

# copy local files to app folder
COPY server/ ./

ENV PORT 8000
EXPOSE 8000

CMD ["npm", "start"]