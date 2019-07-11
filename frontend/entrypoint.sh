#!/bin/sh

envsubst '$$VIRTUAL_HOST,$$PROJECT_NAME' < /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf

nginx -g 'daemon off;'