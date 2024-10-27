FROM node:20.18.0-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN useradd -m appuser

USER appuser

RUN npm install --only=production

CMD ["npm", "run", "start"]

HEALTHCHECK CMD --interval=10m --timeout=3s \
    curl --fail http://localhost:3000 || exit 1