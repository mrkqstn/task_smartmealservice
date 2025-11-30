FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig*.json nest-cli.json ormconfig.ts ./
COPY src ./src
COPY scripts ./scripts

RUN npm run build && chmod +x scripts/entrypoint.sh

EXPOSE 3001

CMD ["sh", "./scripts/entrypoint.sh"]
