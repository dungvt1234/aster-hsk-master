# Multi-stage Dockerfile for high-performance Aster Backend Microservice
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build || true

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist 2>/dev/null || true
COPY --from=builder /app/src ./src

EXPOSE 8080
CMD ["npx", "tsx", "src/server.ts"]
