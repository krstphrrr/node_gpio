FROM alpine

# RUN apk add --no-cache --virtual .gyp python make g++ pkgconfig pixman-dev cairo-dev pango-dev
RUN apk add --update npm 
RUN apk add python3 make g++ py3-setuptools
RUN apk add linux-headers



COPY . /usr/node

WORKDIR /usr/node
RUN wget http://abyz.me.uk/lg/lg.zip \
    && unzip lg.zip \
    && cd lg \ 
    && make 

COPY ./src/Makefile /usr/node/lg/Makefile

WORKDIR /usr/node/lg
RUN make install

WORKDIR /usr/node
RUN npm install

WORKDIR /usr/node/src

EXPOSE 3000

CMD ["node", "index.js"]