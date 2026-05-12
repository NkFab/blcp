FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json package-lock.json ./
RUN npm install


COPY . .

EXPOSE 3001