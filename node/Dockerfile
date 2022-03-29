FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app

RUN npm install

COPY ./ /usr/src/app 

EXPOSE 3000

RUN npm i -g npm@8 && npm i
RUN npx prisma generate

CMD ["npm", "start"]
