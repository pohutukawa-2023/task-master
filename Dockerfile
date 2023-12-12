FROM node:18-alpine
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci

COPY . .

ENV NODE_ENV=production

ARG AUTH0_DOMAIN
ENV VITE_AUTH0_DOMAIN=${AUTH0_DOMAIN}

RUN npm run build
RUN npm prune --omit=dev