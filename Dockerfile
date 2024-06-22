FROM node:16.13.0-alpine  as build-stage

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/lawgg-ad

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
