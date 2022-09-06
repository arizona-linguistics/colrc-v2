FROM debian:latest AS builder

ENV NGINX_VERSION=1.19.7 \
    DAV_VERSION=3.0.0 \
    ECHO_VERSION=0.62 \
    FILE_UPLOAD_VERSION=2.3.0 \
    HTTP_AUTH_PAM_VERSION=1.5.2 \
    HTTP_SUBSTITUTIONS_FILTER_VERSION=0.6.4 \
    UPSTREAM_FAIR_VERSION=0.1.3 \
    NGINX_BUILD_ASSETS_DIR=/var/lib/docker-nginx \
    NGINX_BUILD_ROOT_DIR=/var/lib/docker-nginx/rootfs 

ARG WITH_DEBUG=false
ARG WITH_DAV=true
ARG WITH_ECHO=true
ARG WITH_FILE_UPLOAD=true
ARG WITH_HTTP_AUTH_PAM=true
ARG WITH_HTTP_SUBSTITUTIONS_FILTER=true
ARG WITH_UPSTREAM_FAIR=true

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
      wget ca-certificates make gcc g++ pkg-config perl

RUN apt-get update \
 && apt-get install -yyq netcat 

COPY assets/build/ ${NGINX_BUILD_ASSETS_DIR}/

RUN chmod +x ${NGINX_BUILD_ASSETS_DIR}/install.sh

RUN ${NGINX_BUILD_ASSETS_DIR}/install.sh

COPY entrypoint.sh ${NGINX_BUILD_ROOT_DIR}/sbin/entrypoint.sh

RUN chmod 755 ${NGINX_BUILD_ROOT_DIR}/sbin/entrypoint.sh

FROM debian:latest

LABEL maintainer="colrc@thecolrc.org"

ENV NGINX_USER=www-data \
    NGINX_SITECONF_DIR=/etc/nginx/sites-enabled \
    NGINX_LOG_DIR=/var/log/nginx \
    NGINX_TEMP_DIR=/var/lib/nginx \
    NGINX_CACHE_DIR=/var/cache/nginx \
    NGINX_HTML_DIR=/var/www/colrc \
    NGINX_FILE_DIR=/var/www/colrc/files

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
    ca-certificates curl libssl1.1 libxslt1.1 libgd3 libgeoip1 rsync unzip gettext-base \
 && rm -rf /var/lib/apt/lists/*


# two-step copy
COPY --from=builder /var/lib/docker-nginx/rootfs /rootfs
RUN rsync -rtvazP /rootfs/* / \
    && rm -rf /rootfs

# copy texts and audio files into the nginx file directory
# make sure to add the actual Dropbox share link to end of the curl command!
#RUN mkdir -p ${NGINX_FILE_DIR} \
#    && cd ${NGINX_FILE_DIR} \
#    && curl -Lo audio.zip https://www.dropbox.com/sh/jtd0hw3r97rj48q/AADPJFTY0KvJnz83zK97vZh0a?dl=0  \ 
#    && unzip audio.zip -x / \
#    && rm -f audio.zip

# COPY ./assets/build/config/default.conf /etc/nginx/conf.d
# COPY ./assets/build/config/nginx.conf /etc/nginx.conf
# COPY ./assets/build/config/sites-enabled/colrc.template /etc/nginx/sites-enabled/colrc

RUN mkdir -p ${NGINX_FILE_DIR} && touch ${NGINX_FILE_DIR}/nothing.txt

RUN chmod 755 ${NGINX_FILE_DIR} && chmod 644 ${NGINX_FILE_DIR}/*


EXPOSE 80/tcp 443/tcp 1935/tcp

ENTRYPOINT ["/sbin/entrypoint.sh"]

CMD ["/usr/sbin/nginx"]

# CMD ["nginx", "-g", "daemon off;"]


