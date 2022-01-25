FROM node:14.18-alpine

WORKDIR /app

COPY package.json .

RUN yarn install --prod

COPY . .

CMD ["yarn", "start"]