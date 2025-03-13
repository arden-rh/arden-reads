FROM alpine:latest

ARG PB_VERSION=0.25.9

# RUN apk add --no-cache \
#    unzip \
#    ca-certificates

# RUN apt-get update && apt-get install -y curl unzip \
#    && rm -rf /var/lib/apt/lists/*
RUN apk add --no-cache curl unzip

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# RUN curl -fsSL -o pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
#    && unzip pocketbase_${PB_VERSION}_linux_amd64.zip \
#    && rm pocketbase_${PB_VERSION}_linux_amd64.zip \
#	 && chmod +x pocketbase

# uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]

# WORKDIR /app
# RUN apk add --no-cache curl unzip
# RUN curl -fsSL -o pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v0.25.9/pocketbase_0.25.9_linux_amd64.zip \
#    && unzip pocketbase.zip \
#    && rm pocketbase.zip \
#	&& chmod +x pocketbase
# COPY pocketbase/* /app/
# CMD ["./pocketbase", "serve", "--http=0.0.0.0:3000"]