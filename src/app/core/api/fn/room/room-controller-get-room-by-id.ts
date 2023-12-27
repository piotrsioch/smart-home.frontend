/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RoomDto } from '../../models/room-dto';

export interface RoomControllerGetRoomById$Params {
  id: string;
}

export function roomControllerGetRoomById(http: HttpClient, rootUrl: string, params: RoomControllerGetRoomById$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
  const rb = new RequestBuilder(rootUrl, roomControllerGetRoomById.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RoomDto>;
    })
  );
}

roomControllerGetRoomById.PATH = '/room/get-by-id';
