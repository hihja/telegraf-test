FROM node:20

EXPOSE 5000

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]
