FROM alpine:latest

ARG PB_VERSION=0.25.9

RUN apk add --no-cache \
	ca-certificates \
	unzip \
	wget \
	zip \
	zlib-dev 

# download and unzip PocketBase
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
	&& unzip pocketbase_${PB_VERSION}_linux_amd64.zip \
	&& chmod +x /pocketbase

EXPOSE 8080

# start PocketBase
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8080"]
