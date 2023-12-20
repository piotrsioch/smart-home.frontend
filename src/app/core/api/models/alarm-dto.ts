/* tslint:disable */
/* eslint-disable */
export interface AlarmDto {
  '_id': string;
  createdAt: string;
  sensorId: string;
  state: 'off' | 'armed' | 'on';
}
