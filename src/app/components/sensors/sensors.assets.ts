export const sensorsTypes = [
  'alarm',
  'dhtSensor',
  'light',
  'pirSensor',
  'reedSwitch',
  'mqSensor',
];

export const sensorIcons = [
  'alarm',
  'dht-sensor',
  'light',
  'pir-sensor',
  'reed-switch',
  'smoke-sensor',
];

export const sensorTypeIconMap = sensorsTypes.reduce((acc, roomType, index) => {
  acc[roomType] = sensorIcons[index];
  return acc;
}, {} as { [key: string]: string });
