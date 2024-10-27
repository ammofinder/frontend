FROM node:20.18.0-slim

WORKDIR /app

COPY . .

RUN npm install --only=production

CMD ["npm", "run", "start"]