#!/bin/bash

# Set the directories for frontend and backend
FRONTEND_DIR="netflix-ui"
BACKEND_DIR="netflix-api"

# Install pm2 globally if not already installed
if ! command -v pm2 &> /dev/null
then
    echo "pm2 could not be found, installing globally..."
    npm install -g pm2
fi

# Function to start a Node.js application using pm2
start_app() {
  APP_DIR=$1
  APP_START_SCRIPT=$2

  echo "Navigating to $APP_DIR..."
  cd $APP_DIR

  echo "Installing dependencies..."
  npm install

  echo "Starting the application using pm2..."
  pm2 start $APP_START_SCRIPT --name $(basename $APP_DIR)

  # Check if the application started successfully
  if pm2 info $(basename $APP_DIR) | grep -q "online"
  then
    echo "$(basename $APP_DIR) is running successfully."
  else
    echo "Failed to start $(basename $APP_DIR). Check the logs for details."
    pm2 logs $(basename $APP_DIR)
    exit 1
  fi

  # Navigate back to the initial directory
  cd -
}

# Start the frontend (React) application
start_app $FRONTEND_DIR "npm start"

# Start the backend (Node.js) application
start_app $BACKEND_DIR "yarn start"

echo "Both applications are running in the background using pm2."
