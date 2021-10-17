FROM node:alpine
 
WORKDIR /app
 
COPY package.json yarn.lock./
 
RUN yarn global add react-scripts

RUN yarn add typescript

RUN yarn
 
COPY . .
 
EXPOSE 3000
 
CMD yarn start