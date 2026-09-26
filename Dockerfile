FROM oven/bun:1.3-alpine AS build
WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN test -n "$VITE_API_URL" && bun run build

FROM nginx:alpine
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
