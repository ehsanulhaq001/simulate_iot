// author: Ehsan Ul Haq
// Date Created: 13-02-2022

let awsIot = require("aws-iot-device-sdk");

const path = <FOLDER_PATH_HERE />;
const hostName = <HOSTNAME_OR_ENDPOINT_HERE />;

let device = {
  keyPath: path + "iot_thing-private.pem.key",
  certPath: path + "iot_thing-certificate.pem.crt",
  caPath: path + "AmazonRootCA1.cer",
  host: hostName,
};

let tempDevices = [];

let tempCount = [];
let tempTimeout = [];

let inter = 1000;
let number = 5;
let lim = 5;

console.log(
  "\n..........................................\n\nSimulating ",
  number,
  " IoT devices for Temperature, publishing ",
  lim,
  " messages after ",
  (inter / 1000).toFixed(3),
  ` second${inter > 1000 ? "s" : ""} each .....`
);

let cleared = 0;

for (let i = 0; i < number; i++) {
  let tempDevice = device;
  tempDevice.clientId = "temp_device_id_" + (i + 1).toString();
  tempDevices[i] = awsIot.device(tempDevice);

  tempCount.push(0);
  tempTimeout.push(null);
}

tempDevices.forEach((device, i) => {
  device.on("connect", function () {
    console.log("connected Temp ", i + 1);
    device.subscribe("iot_topic");
    tempTimeout[i] = setInterval(() => publishData("temp", device, i), inter);
  });
});

function publishData(d, device, i) {
  let x;

  tempCount[i]++;
  if (tempCount[i] > lim) {
    clearInterval(tempTimeout[i]);
    cleared++;
    checkFinished();
    return;
  }
  x = tempCount[i];

  device.publish(
    "iot_topic",
    JSON.stringify({
      device_id: `temp_device_id_${i + 1}`,
      time_stamp: new Date().toISOString(),
      sensor: "Temperature",
      value: 20 + Math.random() * 5,
    })
  );
  console.log("Temp ", x, `${x > 9 ? "" : " "} published at `, new Date());
}

function checkFinished() {
  if (cleared == number) process.exit();
}
