FROM node:12.13.0-alpine as builder

# Build Theme
WORKDIR /build/themes/yeldirium

ADD themes/yeldirium/package.json package.json
ADD themes/yeldirium/yarn.lock yarn.lock

RUN yarn install

ADD themes/yeldirium/ .

RUN npx webpack --mode production

# Build Site
WORKDIR /build

ADD package.json /build/package.json
ADD yarn.lock /build/yarn.lock

RUN yarn install

ADD source source
ADD _config.yml _config.yml

RUN npx hexo generate

# Build minimal Apache image
FROM httpd:2.4.41

ADD apache/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=builder /build/public /usr/local/apache2/htdocs
ADD apache/.htaccess /usr/local/apache2/htdocs/.htaccess
