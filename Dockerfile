FROM node:12.13.0-alpine as builder
WORKDIR /build

ADD package.json /build/package.json
ADD yarn.lock /build/yarn.lock

ADD themes/yeldirium/package.json /build/themes/yeldirium/package.json
ADD themes/yeldirium/yarn.lock /build/themes/yeldirium/yarn.lock

RUN yarn setup

ADD . /build/

RUN yarn run build


FROM httpd:2.4.41

ADD apache/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=builder /build/public /usr/local/apache2/htdocs
ADD apache/.htaccess /usr/local/apache2/htdocs/.htaccess
