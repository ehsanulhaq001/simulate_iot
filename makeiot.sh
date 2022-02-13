# author: Ehsan Ul Haq
# Date Created: 13-02-2022

# !/usr/bin/env bash
# stop script on error
set -e

if [ ! -e "node_modules" ]; then
  npm init -y
  if [ ! -e "node_modules/aws-iot-device-sdk" ]; then
    printf "\nInstalling AWS IOT DEVICE SDK...\n"
    npm install aws-iot-device-sdk
  fi
else
  if [ ! -e "node_modules/aws-iot-device-sdk" ]; then
    printf "\nInstalling AWS IOT DEVICE SDK...\n"
    npm install aws-iot-device-sdk
  fi
fi

printf "\n"

if  [ ! -e "iot_thing-private.pem.key" ] || ! [ -e "iot_thing-certificate.pem.crt" ] || ! [ -e "AmazonRootCA1.cer" ]; then
  if [ ! -e "iot_thing-certificate.pem.crt" ]; then
    printf "iot_thing-certificate.pem.crt not present\n"
  fi
  if [ ! -e "iot_thing-private.pem.key" ]; then
    printf "iot_thing-private.pem.key not present\n"
  fi
  if [ ! -e "AmazonRootCA1.cer" ]; then
    printf "AmazonRootCA1.cer not present\n"
  fi
else
  if [ -e 'iot_simulator.js' ]; then
    printf "Running iot_simulator...\n\n"
    node iot_simulator.js
  else
    printf "iot_simulator.js not present\n"
  fi
fi





