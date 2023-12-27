/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DhtSensorDto } from '../../models/dht-sensor-dto';

export interface DhtSensorControllerGetLatestData$Params {
  sensorId: string;
}

export function dhtSensorControllerGetLatestData(http: HttpClient, rootUrl: string, params: DhtSensorControllerGetLatestData$Params, context?: HttpContext): Observable<StrictHttpResponse<DhtSensorDto>> {
  const rb = new RequestBuilder(rootUrl, dhtSensorControllerGetLatestData.PATH, 'get');
  if (params) {
    rb.query('sensorId', params.sensorId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DhtSensorDto>;
    })
  );
}

dhtSensorControllerGetLatestData.PATH = '/dht-sensor/latest-data';
