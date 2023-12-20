/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RoomDto } from '../../models/room-dto';
import { RoomSensorInputDto } from '../../models/room-sensor-input-dto';

export interface RoomControllerAssignSensorToRoom$Params {
      body: RoomSensorInputDto
}

export function roomControllerAssignSensorToRoom(http: HttpClient, rootUrl: string, params: RoomControllerAssignSensorToRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
  const rb = new RequestBuilder(rootUrl, roomControllerAssignSensorToRoom.PATH, 'post');
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

roomControllerAssignSensorToRoom.PATH = '/room/assign-sensor-to-room';
