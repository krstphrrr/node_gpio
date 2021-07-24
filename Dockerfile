FROM alpine

# RUN apk add --no-cache --virtual .gyp python make g++ pkgconfig pixman-dev cairo-dev pango-dev
RUN apk add --update npm
COPY . /usr/node

WORKDIR /usr/node

# RUN npm install

WORKDIR /usr/node/src

EXPOSE 3000

# CMD ["node", "index.js"]