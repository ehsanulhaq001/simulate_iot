# Simulate IoT for AWS IoT_Core

Script to simulate IoT devices to connect with AWS IoT core.
If your device (is not unix based) doesn't support bash shell script file , look into the makeiot.sh file and run the commands on your own.
It requires npm to be installed on the device.

![Tutorial][tutorial]

## Download the below two files

  1. iot_simulator.js
  2. makeiot.sh

Make a folder *cert*.
Open the file iot_simulator.js and edit the path, hostName and topic.

### Move these files (from aws iot) to the folder *cert*

  1. Certificate with name : 'iot_thing-certificate.pem.crt'.
  2. Private key with name : 'iot_thing-private.pem.key'.
  3. Root CA with name : 'AmazonRootCA1.cer

### Open terminal

  1. Go to the folder.
  2. run ```chmod +x makeiot.sh``` to make script executable.

#### Check if all the required files are in the same folder with proper names

#### Now run ```./makeiot.sh``` and enjoy

Thanks

Ehsan

[tutorial]: simulate_iot.gif
