FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.26.1-alpine

WORKDIR /usr/share/nginx/html
COPY /nginx-default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/ .

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]