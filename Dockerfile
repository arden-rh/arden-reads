FROM alpine:latest
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache curl unzip
RUN curl -fsSL -o pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v0.25.9/pocketbase_0.25.9_linux_amd64.zip \
    && unzip pocketbase.zip \
    && rm pocketbase.zip
COPY . /app
CMD ["./pocketbase", "serve", "--http=0.0.0.0:3000"]