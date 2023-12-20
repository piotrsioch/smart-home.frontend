/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RoomDto } from '../../models/room-dto';
import { RoomSensorInputDto } from '../../models/room-sensor-input-dto';

export interface RoomControllerRemoveSensorFromRoom$Params {
      body: RoomSensorInputDto
}

export function roomControllerRemoveSensorFromRoom(http: HttpClient, rootUrl: string, params: RoomControllerRemoveSensorFromRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
  const rb = new RequestBuilder(rootUrl, roomControllerRemoveSensorFromRoom.PATH, 'post');
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

roomControllerRemoveSensorFromRoom.PATH = '/room/remove-sensor-from-room';
