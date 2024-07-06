FROM node:alpine

# Create app directory
WORKDIR /volteras/backend

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY . .

RUN npm install
RUN npm run build

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
