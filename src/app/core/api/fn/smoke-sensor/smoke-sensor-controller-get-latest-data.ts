/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SmokeSensorDto } from '../../models/smoke-sensor-dto';

export interface SmokeSensorControllerGetLatestData$Params {
  sensorId: string;
}

export function smokeSensorControllerGetLatestData(http: HttpClient, rootUrl: string, params: SmokeSensorControllerGetLatestData$Params, context?: HttpContext): Observable<StrictHttpResponse<SmokeSensorDto>> {
  const rb = new RequestBuilder(rootUrl, smokeSensorControllerGetLatestData.PATH, 'get');
  if (params) {
    rb.query('sensorId', params.sensorId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SmokeSensorDto>;
    })
  );
}

smokeSensorControllerGetLatestData.PATH = '/smoke-sensor/latest-data';
