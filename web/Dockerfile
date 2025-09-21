# Frontend Dockerfile for brev-ly
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine AS deploy
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY --from=build /app/index.html .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
