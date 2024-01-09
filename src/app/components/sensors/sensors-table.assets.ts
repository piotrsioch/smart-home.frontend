export interface Sensor {
  id: string;
  location: string;
  name: string;
  roomId: string;
  type: 'dhtSensor' | 'pirSensor' | 'reedSwitch' | 'light' | 'mqSensor' | 'alarm';
}

