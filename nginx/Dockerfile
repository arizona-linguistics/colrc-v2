FROM ubuntu:bionic-20190612 AS builder

ENV NGINX_VERSION=1.15.12 \
    NGINX_BUILD_ASSETS_DIR=/var/lib/docker-nginx \
    NGINX_BUILD_ROOT_DIR=/var/lib/docker-nginx/rootfs

ARG WITH_DEBUG=false

ARG WITH_ECHO=true

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
      wget ca-certificates make gcc g++ pkg-config

RUN apt-get install -yyq netcat

COPY ./assets/build/ ${NGINX_BUILD_ASSETS_DIR}/

RUN chmod +x ${NGINX_BUILD_ASSETS_DIR}/install.sh

RUN ${NGINX_BUILD_ASSETS_DIR}/install.sh

COPY ./entrypoint.sh ${NGINX_BUILD_ROOT_DIR}/sbin/entrypoint.sh

RUN chmod 755 ${NGINX_BUILD_ROOT_DIR}/sbin/entrypoint.sh

FROM ubuntu:bionic-20190612

LABEL maintainer="colrc@thecolrc.org"

ENV NGINX_USER=www-data \
    NGINX_SITECONF_DIR=/etc/nginx/sites-enabled \
    NGINX_LOG_DIR=/var/log/nginx \
    NGINX_TEMP_DIR=/var/lib/nginx

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
      libssl1.1 libxslt1.1 libgd3 libgeoip1 libfdk-aac1 \
 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /var/lib/docker-nginx/rootfs /

EXPOSE 80/tcp 443/tcp 1935/tcp

ENTRYPOINT ["/sbin/entrypoint.sh"]

CMD ["/usr/sbin/nginx"]