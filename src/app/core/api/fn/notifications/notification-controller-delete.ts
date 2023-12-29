/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeleteNotificationInputDto } from '../../models/delete-notification-input-dto';
import { SuccessDto } from '../../models/success-dto';

export interface NotificationControllerDelete$Params {
      body: DeleteNotificationInputDto
}

export function notificationControllerDelete(http: HttpClient, rootUrl: string, params: NotificationControllerDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<SuccessDto>> {
  const rb = new RequestBuilder(rootUrl, notificationControllerDelete.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SuccessDto>;
    })
  );
}

notificationControllerDelete.PATH = '/notifications/delete';
