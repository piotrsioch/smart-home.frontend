/* tslint:disable */
/* eslint-disable */
export interface AlarmDto {
  createdAt: string;
  id: string;
  sensorId: string;
  state: 'off' | 'armed' | 'on';
}
