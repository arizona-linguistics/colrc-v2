#!/bin/bash
set -e

install_packages() {
  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends "$@"
}

download_and_extract() {
  src=${1}
  dest=${2}
  tarball=$(basename ${src})

  if [[ ! -f ${NGINX_BUILD_ASSETS_DIR}/${tarball} ]]; then
    echo "Downloading ${1}..."
    wget ${src} -O ${NGINX_BUILD_ASSETS_DIR}/${tarball}
  fi

  echo "Extracting ${tarball}..."
  mkdir ${dest}
  tar xf ${NGINX_BUILD_ASSETS_DIR}/${tarball} --strip=1 -C ${dest}
}

strip_debug() {
  local dir=${1}
  local filter=${2}
  for f in $(find "${dir}" -name "${filter}")
  do
    if [[ -f ${f} ]]; then
      strip --strip-all ${f}
    fi
  done
}

${WITH_ECHO} && { 
    download_and_extract "https://github.com/openresty/echo-nginx-module/archive/refs/tags/v${ECHO_VERSION}.tar.gz" ${NGINX_BUILD_ASSETS_DIR}/echo-nginx-module
    EXTRA_ARGS+=" --add-module=${NGINX_BUILD_ASSETS_DIR}/echo-nginx-module"
}

${WITH_FILE_UPLOAD} && { 
    download_and_extract "https://github.com/vkholodkov/nginx-upload-module/archive/refs/tags/${FILE_UPLOAD_VERSION}.tar.gz" ${NGINX_BUILD_ASSETS_DIR}/nginx-upload-module
    EXTRA_ARGS+=" --add-module=${NGINX_BUILD_ASSETS_DIR}/nginx-upload-module"
}

${WITH_HTTP_SUBSTITUTIONS_FILTER} && { 
    download_and_extract "https://github.com/yaoweibin/ngx_http_substitutions_filter_module/archive/refs/tags/v${HTTP_SUBSTITUTIONS_FILTER_VERSION}.tar.gz" ${NGINX_BUILD_ASSETS_DIR}/ngx_http_substitutions_filter_module
    EXTRA_ARGS+=" --add-module=${NGINX_BUILD_ASSETS_DIR}/ngx_http_substitutions_filter_module"
}

${WITH_UPSTREAM_FAIR} && { 
    download_and_extract "https://github.com/itoffshore/nginx-upstream-fair/archive/refs/tags/${UPSTREAM_FAIR_VERSION}.tar.gz" ${NGINX_BUILD_ASSETS_DIR}/nginx-upstream-fair
    EXTRA_ARGS+=" --add-module=${NGINX_BUILD_ASSETS_DIR}/nginx-upstream-fair"
}

${WITH_DAV} && { 
    download_and_extract "https://github.com/arut/nginx-dav-ext-module/archive/refs/tags/v${DAV_VERSION}.tar.gz" ${NGINX_BUILD_ASSETS_DIR}/nginx-dav-ext-module
    EXTRA_ARGS+=" --add-module=${NGINX_BUILD_ASSETS_DIR}/nginx-dav-ext-module"
}

${WITH_HTTP_AUTH_PAM} && { 
    download_and_extract "https://github.com/sto/ngx_http_auth_pam_module/archive/refs/tags/v${HTTP_AUTH_PAM_VERSION}.tar.gz" ${NGINX_BUILD_ASSETS_DIR}/ngx_http_auth_pam_module
    EXTRA_ARGS+=" --add-module=${NGINX_BUILD_ASSETS_DIR}/ngx_http_auth_pam_module"
}

# download_and_extract "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" ${NGINX_BUILD_ASSETS_DIR}/nginx
# cd ${NGINX_BUILD_ASSETS_DIR}/nginx
# install_packages libpcre++-dev libssl-dev zlib1g-dev libxslt1-dev libgd-dev libgeoip-dev uuid-dev
# ./configure \
#   --prefix=/usr/share/nginx \
#   --sbin-path=/usr/sbin/nginx \
#   --conf-path=/etc/nginx/nginx.conf \
#   --error-log-path=/var/log/nginx/error.log \
#   --pid-path=/run/nginx.pid \
#   --lock-path=/var/lock/nginx.lock \
#   --with-threads \
#   --with-http_ssl_module \
#   --with-http_v2_module \
#   --with-http_realip_module \
#   --with-http_addition_module \
#   --with-http_xslt_module \
#   --with-http_image_filter_module \
#   --with-http_sub_module \
#   --with-http_dav_module \
#   --with-http_gunzip_module \
#   --with-http_gzip_static_module \
#   --with-http_auth_request_module \
#   --with-http_stub_status_module \
#   --with-http_geoip_module \
#   --http-log-path=/var/log/nginx/access.log \
#   --http-client-body-temp-path=/var/lib/nginx/body \
#   --http-proxy-temp-path=/var/lib/nginx/proxy \
#   --http-fastcgi-temp-path=/var/lib/nginx/fastcgi \
#   --http-uwsgi-temp-path=/var/lib/nginx/uwsgi \
#   --http-scgi-temp-path=/var/lib/nginx/scgi \
#   --with-mail \
#   --with-mail_ssl_module \
#   --with-stream \
#   --with-stream_ssl_module \
#   --with-pcre-jit \
#   --with-cc-opt='-O2 -fstack-protector-strong -Wformat -Werror=format-security -fPIC -D_FORTIFY_SOURCE=2' \
#   --with-ld-opt='-Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,-z,now -fPIC' \
#   ${EXTRA_ARGS}

download_and_extract "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" ${NGINX_BUILD_ASSETS_DIR}/nginx
cd ${NGINX_BUILD_ASSETS_DIR}/nginx
install_packages libpcre++-dev libssl-dev zlib1g-dev libxslt1-dev libgd-dev libgeoip-dev uuid-dev libpam0g-dev libperl-dev
./configure \
    --prefix=/etc/nginx \
    --sbin-path=/usr/sbin/nginx \
    --modules-path=/usr/lib/nginx/modules \
    --conf-path=/etc/nginx/nginx.conf \
    --error-log-path=/var/log/nginx/error.log \
    --pid-path=/var/run/nginx.pid \
    --lock-path=/var/run/nginx.lock \
    --user=nginx \
    --group=nginx \
    --build=Debian \
    --with-select_module \
    --with-poll_module \
    --with-threads \
    --with-file-aio \
    --with-http_ssl_module \
    --with-http_v2_module \
    --with-http_realip_module \
    --with-http_addition_module \
    --with-http_xslt_module=dynamic \
    --with-http_image_filter_module=dynamic \
    --with-http_geoip_module=dynamic \
    --with-http_sub_module \
    --with-http_dav_module \
    --with-http_flv_module \
    --with-http_mp4_module \
    --with-http_gunzip_module \
    --with-http_gzip_static_module \
    --with-http_auth_request_module \
    --with-http_random_index_module \
    --with-http_secure_link_module \
    --with-http_degradation_module \
    --with-http_slice_module \
    --with-http_stub_status_module \
    --with-http_perl_module=dynamic \
    --with-perl_modules_path=/usr/share/perl/5.28.1 \
    --with-perl=/usr/bin/perl \
    --http-log-path=/var/log/nginx/access.log \
    --http-client-body-temp-path=/var/cache/nginx/client_temp \
    --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
    --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
    --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
    --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
    --with-mail=dynamic \
    --with-mail_ssl_module \
    --with-stream=dynamic \
    --with-stream_ssl_module \
    --with-stream_realip_module \
    --with-stream_geoip_module=dynamic \
    --with-stream_ssl_preread_module \
    --with-compat \
    --with-pcre-jit \
    --with-openssl-opt=no-nextprotoneg \
    --with-debug \
    --with-cc-opt='-O2 -fstack-protector-strong -Wformat -Werror=format-security -fPIC -D_FORTIFY_SOURCE=2' \
    --with-ld-opt='-Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,-z,now -fPIC' \
    ${EXTRA_ARGS}

make -j$(nproc)
make DESTDIR=${NGINX_BUILD_ROOT_DIR} install

# install default configuration
mkdir -p ${NGINX_BUILD_ROOT_DIR}/etc/nginx/sites-enabled
cp ${NGINX_BUILD_ASSETS_DIR}/config/nginx.conf ${NGINX_BUILD_ROOT_DIR}/etc/nginx/nginx.conf
cp ${NGINX_BUILD_ASSETS_DIR}/config/sites-enabled/default ${NGINX_BUILD_ROOT_DIR}/etc/nginx/sites-enabled/default
