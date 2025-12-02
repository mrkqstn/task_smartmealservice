FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm install

COPY tsconfig*.json nest-cli.json ormconfig.ts ./
COPY src ./src
COPY scripts ./scripts

RUN npm run build

EXPOSE 3001

ENTRYPOINT ["node", "./scripts/entrypoint.js"]
