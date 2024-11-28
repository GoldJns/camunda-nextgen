FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.24.0-alpine-slim

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]