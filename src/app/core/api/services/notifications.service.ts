/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { notificationControllerGetNotificationById } from '../fn/notifications/notification-controller-get-notification-by-id';
import { NotificationControllerGetNotificationById$Params } from '../fn/notifications/notification-controller-get-notification-by-id';
import { notificationControllerNotificationList } from '../fn/notifications/notification-controller-notification-list';
import { NotificationControllerNotificationList$Params } from '../fn/notifications/notification-controller-notification-list';
import { NotificationDto } from '../models/notification-dto';
import { PaginationOutput } from '../models/pagination-output';

@Injectable({ providedIn: 'root' })
export class NotificationsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `notificationControllerGetNotificationById()` */
  static readonly NotificationControllerGetNotificationByIdPath = '/notifications/get-by-id';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notificationControllerGetNotificationById()` instead.
   *
   * This method doesn't expect any request body.
   */
  notificationControllerGetNotificationById$Response(params: NotificationControllerGetNotificationById$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificationDto>> {
    return notificationControllerGetNotificationById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notificationControllerGetNotificationById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notificationControllerGetNotificationById(params: NotificationControllerGetNotificationById$Params, context?: HttpContext): Observable<NotificationDto> {
    return this.notificationControllerGetNotificationById$Response(params, context).pipe(
      map((r: StrictHttpResponse<NotificationDto>): NotificationDto => r.body)
    );
  }

  /** Path part for operation `notificationControllerNotificationList()` */
  static readonly NotificationControllerNotificationListPath = '/notifications/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notificationControllerNotificationList()` instead.
   *
   * This method doesn't expect any request body.
   */
  notificationControllerNotificationList$Response(params: NotificationControllerNotificationList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<NotificationDto>;
}>> {
    return notificationControllerNotificationList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notificationControllerNotificationList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notificationControllerNotificationList(params: NotificationControllerNotificationList$Params, context?: HttpContext): Observable<PaginationOutput & {
'items'?: Array<NotificationDto>;
}> {
    return this.notificationControllerNotificationList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationOutput & {
'items'?: Array<NotificationDto>;
}>): PaginationOutput & {
'items'?: Array<NotificationDto>;
} => r.body)
    );
  }

}
