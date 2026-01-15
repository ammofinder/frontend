FROM node:25.3.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

FROM node:25.3.0-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN adduser -D appuser && chown -R appuser:appuser /app

USER appuser

CMD ["npm", "run", "start"]

HEALTHCHECK --timeout=3s \
    CMD wget -qO- http://localhost:3000/status || exit 1
