/*

This code can be used to simulate IoT devices publishing data to the AWS IoT Core.
User can edit the number of devices (number) and the number of messages (lim) to be published.
The function publishes the data every 1 second by default.

Please check the AWS IoT sdk js documentation: https://github.com/aws/aws-iot-device-sdk-js#device-class

@author Ehsan Ul Haq
@since 13-02-2022
@version 1.0

*/

// You can change the sdk to the newer aws-iot-device-sdk-v2 version.
let awsIot = require("aws-iot-device-sdk");

const path = YOUR_PATH_TO_THE_FOLDER + "/";
const hostName = YOUR_HOST_NAME;

let device = {
  keyPath: path + "iot_thing-private.pem.key",
  certPath: path + "iot_thing-certificate.pem.crt",
  caPath: path + "AmazonRootCA1.cer",
  host: hostName,
};

let tempDevices = [];
let tempCount = [];
let tempTimeout = [];
let cleared = 0;

// variables to be edited
let inter = 1000;
let number = 5;
let lim = 10;
const iot_topic = "iot_topic";

console.log(
  "\n..........................................\n\nSimulating",
  number,
  "IoT devices for Temperature,\npublishing a total of",
  lim,
  "messages after every",
  inter,
  "milliseconds \nto topic:",
  iot_topic,
  "\n"
);

for (let i = 0; i < number; i++) {
  let tempDevice = device;
  tempDevice.clientId = "temp_device_id_" + (i + 1).toString();
  tempDevices[i] = awsIot.device(tempDevice);

  tempCount.push(0);
  tempTimeout.push(null);
}

tempDevices.forEach((device, i) => {
  device.on("connect", function () {
    console.log("Temp", i + 1, "connected");
    device.subscribe(iot_topic);
    tempTimeout[i] = setInterval(() => publishData(device, i), inter);
  });
});

function publishData(device, i) {
  tempCount[i]++;

  // clear interval if lim is reached
  if (tempCount[i] > lim) {
    clearInterval(tempTimeout[i]);
    cleared++;
    checkFinished();
    return;
  }

  // publish data to the topic iot_topic
  device.publish(
    iot_topic,
    JSON.stringify({
      device_id: `temp_device_id_${i + 1}`,
      time_stamp: new Date().toISOString(),
      sensor: "Temperature",
      value: 20 + Math.random() * 5,
    })
  );

  console.log(
    "temp_device_id_",
    i + 1,
    " Item ",
    tempCount[i],
    `${tempCount[i] > 9 ? "" : " "} published at `,
    new Date()
  );
}

function checkFinished() {
  // if all intervals are cleared i.e. all devices have published lim messages, then exit
  if (cleared == number) {
    console.log("\nAll messages published\n");
    process.exit();
  }
}
