FROM node:alpine

RUN mkdir -p /app
WORKDIR /app
ADD . ./

RUN yarn install --production
RUN yarn global add http-server-spa
RUN yarn run build

CMD cd build && http-server-spa . index.html 5000

EXPOSE 5000