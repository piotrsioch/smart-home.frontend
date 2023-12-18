/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ReedSwitchDto } from '../../models/reed-switch-dto';

export interface ReedSwitchControllerGetLatestData$Params {
  sensorId: string;
}

export function reedSwitchControllerGetLatestData(http: HttpClient, rootUrl: string, params: ReedSwitchControllerGetLatestData$Params, context?: HttpContext): Observable<StrictHttpResponse<ReedSwitchDto>> {
  const rb = new RequestBuilder(rootUrl, reedSwitchControllerGetLatestData.PATH, 'get');
  if (params) {
    rb.query('sensorId', params.sensorId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ReedSwitchDto>;
    })
  );
}

reedSwitchControllerGetLatestData.PATH = '/reed-switch/latest-data';
