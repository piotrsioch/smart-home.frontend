/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DhtSensorDto } from '../../models/dht-sensor-dto';
import { PaginationOutput } from '../../models/pagination-output';

export interface DhtSensorControllerDhtSensorList$Params {
  page: number;
  limit: number;
  orderField?: 'temperature' | 'humidity' | 'sensorId' | 'createdAt';
  orderDirection?: 'ASC' | 'DESC';
  search?: string;
}

export function dhtSensorControllerDhtSensorList(http: HttpClient, rootUrl: string, params: DhtSensorControllerDhtSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<DhtSensorDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, dhtSensorControllerDhtSensorList.PATH, 'get');
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
      'items'?: Array<DhtSensorDto>;
      }>;
    })
  );
}

dhtSensorControllerDhtSensorList.PATH = '/dht-sensor/list';
