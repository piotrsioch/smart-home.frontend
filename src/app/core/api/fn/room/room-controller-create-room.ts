/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateRoomInputDto } from '../../models/create-room-input-dto';
import { RoomDto } from '../../models/room-dto';

export interface RoomControllerCreateRoom$Params {
      body: CreateRoomInputDto
}

export function roomControllerCreateRoom(http: HttpClient, rootUrl: string, params: RoomControllerCreateRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
  const rb = new RequestBuilder(rootUrl, roomControllerCreateRoom.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

roomControllerCreateRoom.PATH = '/room/create-room';
