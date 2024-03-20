#!/bin/bash

echo "▶️ Starting app in production mode (Docker)..."

# Define environment variables
LOGS_VOLUME=../.docker/app/logs
DOCKER_COMPOSE=docker-compose
DOCKER_COMPOSE_FILE=docker/docker-compose.yml

# Create the logs directory with the correct permissions
mkdir -p -m 755 ${LOGS_VOLUME}

# Start Docker Compose
${DOCKER_COMPOSE} -f ${DOCKER_COMPOSE_FILE} --env-file ../.env up --build
