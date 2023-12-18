/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginationOutput } from '../../models/pagination-output';

export interface NotificationControllerNotificationList$Params {
  page: number;
  limit: number;
  orderField?: 'sensorId' | 'createdAt' | 'isActive';
  orderDirection?: 'ASC' | 'DESC';
  search?: string;
}

export function notificationControllerNotificationList(http: HttpClient, rootUrl: string, params: NotificationControllerNotificationList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput>> {
  const rb = new RequestBuilder(rootUrl, notificationControllerNotificationList.PATH, 'get');
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
      return r as StrictHttpResponse<PaginationOutput>;
    })
  );
}

notificationControllerNotificationList.PATH = '/notifications/list';
