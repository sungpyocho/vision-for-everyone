# Production Build

# Stage 1: Build React client
FROM node:latest as builder

# Working Directory
WORKDIR /usr/app/client/

# Install dependencies
COPY client/package*.json ./
RUN npm ci

# copy local files to app folder
COPY client/ ./
# Build
RUN npm run build

# Stage 2: Build Nginx Server
FROM nginx:latest

# React app의 build 결과물을 nginx가 serve할 수 있도록 copy
COPY --from=builder /usr/app/client/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY client/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm /etc/nginx/nginx.conf
COPY client/nginx/nginx.conf /etc/nginx/nginx.conf

# 80포트 오픈하고 nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Stage 2: Build Server
FROM node:latest

WORKDIR /usr/app/
COPY --from=builder /usr/app/client/build/ ./client/build/

# Install dependencies
WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm ci

# copy local files to app folder
COPY server/ ./

ENV PORT 8080
EXPOSE 8080

CMD ["node", "index.js"]