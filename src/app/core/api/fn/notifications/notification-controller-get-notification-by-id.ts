/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NotificationDto } from '../../models/notification-dto';

export interface NotificationControllerGetNotificationById$Params {
  sensorId: string;
  state: 'off' | 'armed' | 'on';
}

export function notificationControllerGetNotificationById(http: HttpClient, rootUrl: string, params: NotificationControllerGetNotificationById$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificationDto>> {
  const rb = new RequestBuilder(rootUrl, notificationControllerGetNotificationById.PATH, 'get');
  if (params) {
    rb.query('sensorId', params.sensorId, {});
    rb.query('state', params.state, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<NotificationDto>;
    })
  );
}

notificationControllerGetNotificationById.PATH = '/notifications/get-by-id';
