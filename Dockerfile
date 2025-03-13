FROM alpine:latest
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache curl
RUN curl -fsSL https://github.com/pocketbase/pocketbase/releases/latest/download/pocketbase-linux-amd64.zip -o pocketbase.zip \
    && unzip pocketbase.zip \
    && rm pocketbase.zip
COPY . /app
CMD ["./pocketbase", "serve", "--http=0.0.0.0:3000"]

