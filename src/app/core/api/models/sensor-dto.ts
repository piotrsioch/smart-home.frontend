/* tslint:disable */
/* eslint-disable */
export interface SensorDto {
  '_id': string;
  location: string;
  name: string;
  type: 'dhtSensor' | 'pirSensor' | 'reedSwitch' | 'light' | 'mqSensor' | 'alarm';
}
