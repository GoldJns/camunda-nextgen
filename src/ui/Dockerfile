FROM nginx:1.24.0-alpine-slim


WORKDIR /usr/share/nginx/html

COPY dist/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]