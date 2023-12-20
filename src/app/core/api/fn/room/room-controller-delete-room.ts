/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IdInputDto } from '../../models/id-input-dto';
import { SuccessDto } from '../../models/success-dto';

export interface RoomControllerDeleteRoom$Params {
      body: IdInputDto
}

export function roomControllerDeleteRoom(http: HttpClient, rootUrl: string, params: RoomControllerDeleteRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<SuccessDto>> {
  const rb = new RequestBuilder(rootUrl, roomControllerDeleteRoom.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SuccessDto>;
    })
  );
}

roomControllerDeleteRoom.PATH = '/room/delete-room';
