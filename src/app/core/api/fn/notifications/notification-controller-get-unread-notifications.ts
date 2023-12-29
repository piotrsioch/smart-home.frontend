/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UnreadNotificationsDto } from '../../models/unread-notifications-dto';

export interface NotificationControllerGetUnreadNotifications$Params {
}

export function notificationControllerGetUnreadNotifications(http: HttpClient, rootUrl: string, params?: NotificationControllerGetUnreadNotifications$Params, context?: HttpContext): Observable<StrictHttpResponse<UnreadNotificationsDto>> {
  const rb = new RequestBuilder(rootUrl, notificationControllerGetUnreadNotifications.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UnreadNotificationsDto>;
    })
  );
}

notificationControllerGetUnreadNotifications.PATH = '/notifications/get-unread-notifications';
