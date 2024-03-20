# Use a specific version of node as the base image
ARG NODE_VERSION=20.11.1
ARG WAIT_VERSION=2.12.1
FROM node:${NODE_VERSION}-alpine as base

# Set label and environment variables
LABEL maintainer="Olusola Akinsulere"
ENV NODE_ENV=production \
    FORCE_COLOR=1

# Install system dependencies and the wait utility
RUN apk update && \
    apk upgrade && \
    apk add --no-cache openssl && \
    rm -rf /var/cache/apk/* && \
    npm install -g pm2 && \
    npm cache clean --force

# Add the wait script
COPY ./src/bin/wait /wait
#ADD https://github.com/ufoscout/docker-compose-wait/releases/download/${WAIT_VERSION}/wait /wait
RUN chmod +x /wait

# Set the working directory
WORKDIR /app

# Use a second stage for building the application
FROM base as builder
COPY package*.json ./
RUN npm install && \
    npm cache clean --force
COPY . .
RUN npm run build 

# Use a third stage for the runtime
FROM base as runtime
ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT

# Create a volume for logs
VOLUME ["/app/logs"]
#RUN mkdir =p logs

# Copy necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Uncomment if you need the process.json file
# COPY --from=builder /app/process.json ./process.json

# Set the command to start the application
CMD /wait && npm run typeorm:migration:run && npm start