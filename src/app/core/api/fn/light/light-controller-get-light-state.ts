/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LightDto } from '../../models/light-dto';

export interface LightControllerGetLightState$Params {
  sensorId: string;
}

export function lightControllerGetLightState(http: HttpClient, rootUrl: string, params: LightControllerGetLightState$Params, context?: HttpContext): Observable<StrictHttpResponse<LightDto>> {
  const rb = new RequestBuilder(rootUrl, lightControllerGetLightState.PATH, 'get');
  if (params) {
    rb.query('sensorId', params.sensorId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LightDto>;
    })
  );
}

lightControllerGetLightState.PATH = '/light/get-state';
