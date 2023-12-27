/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginationOutput } from '../../models/pagination-output';
import { RoomDto } from '../../models/room-dto';

export interface RoomControllerRoomList$Params {
  page: number;
  limit: number;
  orderField?: 'name' | 'roomType';
  orderDirection?: 'ASC' | 'DESC';
  search?: string;
}

export function roomControllerRoomList(http: HttpClient, rootUrl: string, params: RoomControllerRoomList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<RoomDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, roomControllerRoomList.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('limit', params.limit, {});
    rb.query('orderField', params.orderField, {});
    rb.query('orderDirection', params.orderDirection, {});
    rb.query('search', params.search, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PaginationOutput & {
      'items'?: Array<RoomDto>;
      }>;
    })
  );
}

roomControllerRoomList.PATH = '/room/list';
