FROM node:alpine

WORKDIR /app


# copy over package.json files
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 5000

CMD ["npm", "run", "preview",  "--", "--host","0.0.0.0"]