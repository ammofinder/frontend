FROM node:20.18.0-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl=7.88.1-10+deb12u7 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm install --only=production && \
    useradd -m appuser

USER appuser

CMD ["npm", "run", "start"]

HEALTHCHECK --timeout=3s \
    CMD curl -f http://localhost:3000 || exit 1