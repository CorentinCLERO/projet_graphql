FROM node:23-bullseye AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

FROM builder AS development

RUN npx prisma generate

CMD ["npm", "run", "dev"]
