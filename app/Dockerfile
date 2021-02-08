FROM node:latest
WORKDIR /app
RUN npm install webpack -g
RUN npm i -D webpack-cli
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN webpack

EXPOSE 3000
CMD ["npm", "start"]