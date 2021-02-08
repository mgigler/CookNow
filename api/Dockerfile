FROM node:latest
WORKDIR /api
COPY package*.json /api/
RUN npm install
RUN npm install nodemon -g
COPY . /api/
EXPOSE 9000
CMD ["npm", "start"]