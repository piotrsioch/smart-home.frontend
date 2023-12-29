/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EditSensorInputDto } from '../../models/edit-sensor-input-dto';
import { SensorDto } from '../../models/sensor-dto';

export interface SensorControllerEditSensor$Params {
      body: EditSensorInputDto
}

export function sensorControllerEditSensor(http: HttpClient, rootUrl: string, params: SensorControllerEditSensor$Params, context?: HttpContext): Observable<StrictHttpResponse<SensorDto>> {
  const rb = new RequestBuilder(rootUrl, sensorControllerEditSensor.PATH, 'post');
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

sensorControllerEditSensor.PATH = '/sensors/edit';
