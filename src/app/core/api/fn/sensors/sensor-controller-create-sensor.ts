/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateSensorInputDto } from '../../models/create-sensor-input-dto';
import { SensorDto } from '../../models/sensor-dto';

export interface SensorControllerCreateSensor$Params {
      body: CreateSensorInputDto
}

export function sensorControllerCreateSensor(http: HttpClient, rootUrl: string, params: SensorControllerCreateSensor$Params, context?: HttpContext): Observable<StrictHttpResponse<SensorDto>> {
  const rb = new RequestBuilder(rootUrl, sensorControllerCreateSensor.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SensorDto>;
    })
  );
}

sensorControllerCreateSensor.PATH = '/sensors/create';
