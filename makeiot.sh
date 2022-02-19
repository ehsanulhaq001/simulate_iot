# This code can be used to simulate IoT devices publishing data to the AWS IoT Core.
# It requires iot_simulator.js file to be present in the same directory and certificates to be presetn in folder "cert" in the same directory.

# @author Ehsan Ul Haq
# @since 13-02-2022
# @version 1.0


# !/usr/bin/env bash
# stop script on error
set -e

if [ ! -e "node_modules" ]; then
  npm init -y
  # You can change the sdk to the newer aws-iot-device-sdk-v2 version.
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

if  [ ! -e "cert/iot_thing-private.pem.key" ] || ! [ -e "cert/iot_thing-certificate.pem.crt" ] || ! [ -e "cert/AmazonRootCA1.cer" ]; then
  if [ ! -e "cert/iot_thing-certificate.pem.crt" ]; then
    printf "iot_thing-certificate.pem.crt not present\n"
  fi
  if [ ! -e "cert/iot_thing-private.pem.key" ]; then
    printf "iot_thing-private.pem.key not present\n"
  fi
  if [ ! -e "cert/AmazonRootCA1.cer" ]; then
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