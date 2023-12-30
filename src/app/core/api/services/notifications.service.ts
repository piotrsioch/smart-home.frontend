/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { notificationControllerDelete } from '../fn/notifications/notification-controller-delete';
import { NotificationControllerDelete$Params } from '../fn/notifications/notification-controller-delete';
import { notificationControllerGetNotificationById } from '../fn/notifications/notification-controller-get-notification-by-id';
import { NotificationControllerGetNotificationById$Params } from '../fn/notifications/notification-controller-get-notification-by-id';
import { notificationControllerGetUnreadNotifications } from '../fn/notifications/notification-controller-get-unread-notifications';
import { NotificationControllerGetUnreadNotifications$Params } from '../fn/notifications/notification-controller-get-unread-notifications';
import { notificationControllerMarkAsRead } from '../fn/notifications/notification-controller-mark-as-read';
import { NotificationControllerMarkAsRead$Params } from '../fn/notifications/notification-controller-mark-as-read';
import { notificationControllerNotificationList } from '../fn/notifications/notification-controller-notification-list';
import { NotificationControllerNotificationList$Params } from '../fn/notifications/notification-controller-notification-list';
import { NotificationDto } from '../models/notification-dto';
import { PaginationOutput } from '../models/pagination-output';
import { SuccessDto } from '../models/success-dto';
import { UnreadNotificationsDto } from '../models/unread-notifications-dto';

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

  /** Path part for operation `notificationControllerGetUnreadNotifications()` */
  static readonly NotificationControllerGetUnreadNotificationsPath = '/notifications/get-unread-notifications';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notificationControllerGetUnreadNotifications()` instead.
   *
   * This method doesn't expect any request body.
   */
  notificationControllerGetUnreadNotifications$Response(params?: NotificationControllerGetUnreadNotifications$Params, context?: HttpContext): Observable<StrictHttpResponse<UnreadNotificationsDto>> {
    return notificationControllerGetUnreadNotifications(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notificationControllerGetUnreadNotifications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notificationControllerGetUnreadNotifications(params?: NotificationControllerGetUnreadNotifications$Params, context?: HttpContext): Observable<UnreadNotificationsDto> {
    return this.notificationControllerGetUnreadNotifications$Response(params, context).pipe(
      map((r: StrictHttpResponse<UnreadNotificationsDto>): UnreadNotificationsDto => r.body)
    );
  }

  /** Path part for operation `notificationControllerMarkAsRead()` */
  static readonly NotificationControllerMarkAsReadPath = '/notifications/mark-as-read';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notificationControllerMarkAsRead()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  notificationControllerMarkAsRead$Response(params: NotificationControllerMarkAsRead$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificationDto>> {
    return notificationControllerMarkAsRead(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notificationControllerMarkAsRead$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  notificationControllerMarkAsRead(params: NotificationControllerMarkAsRead$Params, context?: HttpContext): Observable<NotificationDto> {
    return this.notificationControllerMarkAsRead$Response(params, context).pipe(
      map((r: StrictHttpResponse<NotificationDto>): NotificationDto => r.body)
    );
  }

  /** Path part for operation `notificationControllerDelete()` */
  static readonly NotificationControllerDeletePath = '/notifications/delete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notificationControllerDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  notificationControllerDelete$Response(params: NotificationControllerDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<SuccessDto>> {
    return notificationControllerDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notificationControllerDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  notificationControllerDelete(params: NotificationControllerDelete$Params, context?: HttpContext): Observable<SuccessDto> {
    return this.notificationControllerDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<SuccessDto>): SuccessDto => r.body)
    );
  }

}
