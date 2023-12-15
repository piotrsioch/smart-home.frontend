/* tslint:disable */
/* eslint-disable */
export interface SensorListInputDto {
  limit: number;
  orderDirection?: 'ASC' | 'DESC';
  orderField?: 'sensorId' | 'type' | 'name' | 'location';
  page: number;
  search?: string;
}
