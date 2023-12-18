/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AddPirSensorDataInputDto } from '../../models/add-pir-sensor-data-input-dto';
import { PirSensorDto } from '../../models/pir-sensor-dto';

export interface PirSensorControllerAddPirSensorData$Params {
      body: AddPirSensorDataInputDto
}

export function pirSensorControllerAddPirSensorData(http: HttpClient, rootUrl: string, params: PirSensorControllerAddPirSensorData$Params, context?: HttpContext): Observable<StrictHttpResponse<PirSensorDto>> {
  const rb = new RequestBuilder(rootUrl, pirSensorControllerAddPirSensorData.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PirSensorDto>;
    })
  );
}

pirSensorControllerAddPirSensorData.PATH = '/pir-sensor/add-data';
