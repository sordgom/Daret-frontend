# since the image size is 550Mb, we need to move to multi-stage builds

# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000

CMD ["npm", "start"]   