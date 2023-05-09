FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

RUN npm i -g prisma

COPY . .

RUN prisma generate --schema ./prisma/schema.prisma

EXPOSE 3000

CMD [ "npm", "run", "dev"]