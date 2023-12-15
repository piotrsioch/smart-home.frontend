/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface SmokeSensorControllerDhtSensorList$Params {
  page: number;
  limit: number;
  orderField?: 'value' | 'sensorId' | 'createdAt';
  orderDirection?: 'ASC' | 'DESC';
  search?: string;
}

export function smokeSensorControllerDhtSensorList(http: HttpClient, rootUrl: string, params: SmokeSensorControllerDhtSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, smokeSensorControllerDhtSensorList.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('limit', params.limit, {});
    rb.query('orderField', params.orderField, {});
    rb.query('orderDirection', params.orderDirection, {});
    rb.query('search', params.search, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

smokeSensorControllerDhtSensorList.PATH = '/smoke-sensor/list';
