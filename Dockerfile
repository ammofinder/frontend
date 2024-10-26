FROM node:20.18.0-slim

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start"]