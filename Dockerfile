# Stage 1: Build the Vue app
FROM node:18 AS build

WORKDIR /app

COPY web-code/package*.json ./web-code/

WORKDIR /app/web-code

RUN npm install

COPY web-code/ .

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx config
COPY web-code/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app to Nginx HTML directory
COPY --from=build /app/web-code/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
