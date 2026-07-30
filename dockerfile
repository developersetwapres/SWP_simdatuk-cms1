FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./config/.env .env

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]