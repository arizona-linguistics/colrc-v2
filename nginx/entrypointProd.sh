#!/bin/bash
set -e

# export URL_UPLOAD
# export URL_ODINSON

[[ $DEBUG == true ]] && set -x

create_log_dir() {
  mkdir -p ${NGINX_LOG_DIR}
  chmod -R 0755 ${NGINX_LOG_DIR}
  chown -R ${NGINX_USER}:root ${NGINX_LOG_DIR}
}

create_tmp_dir(){
  mkdir -p ${NGINX_TEMP_DIR}
  chown -R root:root ${NGINX_TEMP_DIR}
}

create_siteconf_dir() {
  mkdir -p ${NGINX_SITECONF_DIR}
  chmod -R 755 ${NGINX_SITECONF_DIR}
}

create_cache_dir() {
    mkdir -p ${NGINX_CACHE_DIR}
    chmod -R 755 ${NGINX_CACHE_DIR}
}

create_html_dir() {
    mkdir -p ${NGINX_HTML_DIR}
    chmod -R 755 ${NGINX_HTML_DIR}
    #echo "<html><head><title>My First HTML Page</title></head><body>My text goes here.</body></html>" > ${NGINX_HTML_DIR}/index.html
    #chmod -R 755 ${NGINX_FILE_DIR}
    #chmod 777 ${NGINX_HTML_DIR}/index.html
}

create_log_dir
create_tmp_dir
create_siteconf_dir
create_cache_dir
create_html_dir


# allow arguments to be passed to nginx
if [[ ${1:0:1} = '-' ]]; then
  EXTRA_ARGS="$@"
  set --
elif [[ ${1} == nginx || ${1} == $(which nginx) ]]; then
  EXTRA_ARGS="${@:2}"
  set --
fi

echo "my URL_UPLOAD is ${URL_UPLOAD}" 
echo "my URL_ODINSON is ${URL_ODINSON}"
envsubst '$${URL_UPLOAD} $${URL_ODINSON}' < /etc/nginx/templates/colrcProd.template > /etc/nginx/sites-enabled/colrc 
exec "$@"
cat /etc/nginx/sites-enabled/colrc 
exec "$@"


# default behaviour is to launch nginx
if [[ -z ${1} ]]; then
  echo "Starting nginx..."
  $(which nginx) -c /etc/nginx/nginx.conf -g "daemon off;" ${EXTRA_ARGS}
  exec "$@"
else
  exec "$@"
fi