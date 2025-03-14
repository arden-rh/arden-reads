FROM alpine:latest

ARG PB_VERSION=0.25.9

# RUN apk add --no-cache \
#    unzip \
#    ca-certificates

# RUN apt-get update && apt-get install -y curl unzip \
#    && rm -rf /var/lib/apt/lists/*
# RUN apk add --no-cache curl unzip
# RUN apt-get update && \ 
#	apt-get install -y \
#	unzip \
#	ca-certificates && \
#	rm -rf /var/lib/apt/lists/*

RUN apk add --no-cache \
	ca-certificates \
	unzip \
	wget \
	zip \
	zlib-dev 

# download and unzip PocketBase
# ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
# RUN unzip /tmp/pb.zip -d /pb/ && \
# 	rm /tmp/pb.zip
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
	&& unzip pocketbase_${PB_VERSION}_linux_amd64.zip \
	&& chmod +x /pocketbase

# RUN curl -fsSL -o pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
#    && unzip pocketbase_${PB_VERSION}_linux_amd64.zip \
#    && rm pocketbase_${PB_VERSION}_linux_amd64.zip \
#	 && chmod +x pocketbase

# uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations

FROM scratch

EXPOSE 8080

# start PocketBase
# CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
CMD ["/pocketbase", "serve", "--http=0.0.0.0:8080", "--dir=/pb_data", "--publicDir=/pb_public"]

# WORKDIR /app
# RUN apk add --no-cache curl unzip
# RUN curl -fsSL -o pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v0.25.9/pocketbase_0.25.9_linux_amd64.zip \
#    && unzip pocketbase.zip \
#    && rm pocketbase.zip \
#	&& chmod +x pocketbase
# COPY pocketbase/* /app/
# CMD ["./pocketbase", "serve", "--http=0.0.0.0:3000"]