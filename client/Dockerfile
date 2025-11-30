FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

ARG VITE_API_URL=http://backend:3001
ENV VITE_API_URL=${VITE_API_URL}

COPY tsconfig*.json vite.config.ts tailwind.config.js postcss.config.js ./
COPY index.html ./index.html
COPY src ./src
COPY public ./public

RUN npm run build

FROM nginx:1.25-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
