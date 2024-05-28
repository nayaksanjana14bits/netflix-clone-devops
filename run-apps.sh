#!/bin/bash

# Set the directories for frontend and backend
FRONTEND_DIR="netflix-ui"
BACKEND_DIR="netflix-api"

# Function to install dependencies and start the application using pm2
start_app() {
  APP_DIR=$1
  START_COMMAND=$2

  echo "Navigating to $APP_DIR..."
  cd $APP_DIR

  echo "Installing dependencies..."
  npm install

  echo "Installing pm2 locally..."
  npm install pm2

  echo "Starting the application using pm2..."
  ./node_modules/pm2/bin/pm2 start $START_COMMAND

  echo "Saving pm2 process list..."
  ./node_modules/pm2/bin/pm2 save

  # Check if the application started successfully
  if ./node_modules/pm2/bin/pm2 info $(basename $APP_DIR) | grep -q "online"
  then
    echo "$(basename $APP_DIR) is running successfully."
  else
    echo "Failed to start $(basename $APP_DIR). Check the logs for details."
    ./node_modules/pm2/bin/pm2 logs $(basename $APP_DIR)
    exit 1
  fi

  # Navigate back to the initial directory
  cd -
}

start_app $FRONTEND_DIR "npm start"

start_app $BACKEND_DIR "yarn start"

echo "Both applications are running in the background using pm2."
