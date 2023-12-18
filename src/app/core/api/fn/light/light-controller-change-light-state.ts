/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChangeLightStateInputDto } from '../../models/change-light-state-input-dto';
import { LightDto } from '../../models/light-dto';

export interface LightControllerChangeLightState$Params {
      body: ChangeLightStateInputDto
}

export function lightControllerChangeLightState(http: HttpClient, rootUrl: string, params: LightControllerChangeLightState$Params, context?: HttpContext): Observable<StrictHttpResponse<LightDto>> {
  const rb = new RequestBuilder(rootUrl, lightControllerChangeLightState.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

lightControllerChangeLightState.PATH = '/light/change-state';
