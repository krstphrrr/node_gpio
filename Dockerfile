FROM alpine

# RUN apk add --no-cache --virtual .gyp python make g++ pkgconfig pixman-dev cairo-dev pango-dev
RUN apk add --update npm 
RUN apk add python3 make g++
RUN apk add linux-headers



COPY . /usr/node

WORKDIR /usr/node
RUN wget http://abyz.me.uk/lg/lg.zip \
    && unzip lg.zip \
    && cd lg \ 
    && make 

COPY ./src/Makefile /usr/node/lg/Makefile

RUN make install

    # && make install

RUN npm install

WORKDIR /usr/node/src

EXPOSE 3000

# CMD ["node", "index.js"]