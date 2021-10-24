FROM node as build-env
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM httpd
WORKDIR /usr/local/apache2/htdocs
COPY --from=build-env /app/dist .