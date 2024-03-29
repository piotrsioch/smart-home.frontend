/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AddDhtSensorDataInputDto } from '../../models/add-dht-sensor-data-input-dto';

export interface DhtSensorControllerAddDhtSensorData$Params {
      body: AddDhtSensorDataInputDto
}

export function dhtSensorControllerAddDhtSensorData(http: HttpClient, rootUrl: string, params: DhtSensorControllerAddDhtSensorData$Params, context?: HttpContext): Observable<StrictHttpResponse<AddDhtSensorDataInputDto>> {
  const rb = new RequestBuilder(rootUrl, dhtSensorControllerAddDhtSensorData.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AddDhtSensorDataInputDto>;
    })
  );
}

dhtSensorControllerAddDhtSensorData.PATH = '/dht-sensor/add-data';
