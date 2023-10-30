FROM nginx:1.20

COPY dist/ /opt/web/dist/

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf