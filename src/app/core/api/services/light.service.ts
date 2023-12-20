/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { lightControllerChangeLightState } from '../fn/light/light-controller-change-light-state';
import { LightControllerChangeLightState$Params } from '../fn/light/light-controller-change-light-state';
import { lightControllerGetLightState } from '../fn/light/light-controller-get-light-state';
import { LightControllerGetLightState$Params } from '../fn/light/light-controller-get-light-state';
import { lightControllerLightList } from '../fn/light/light-controller-light-list';
import { LightControllerLightList$Params } from '../fn/light/light-controller-light-list';
import { LightDto } from '../models/light-dto';
import { PaginationOutput } from '../models/pagination-output';

@Injectable({ providedIn: 'root' })
export class LightService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `lightControllerChangeLightState()` */
  static readonly LightControllerChangeLightStatePath = '/light/change-state';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lightControllerChangeLightState()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  lightControllerChangeLightState$Response(params: LightControllerChangeLightState$Params, context?: HttpContext): Observable<StrictHttpResponse<LightDto>> {
    return lightControllerChangeLightState(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `lightControllerChangeLightState$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  lightControllerChangeLightState(params: LightControllerChangeLightState$Params, context?: HttpContext): Observable<LightDto> {
    return this.lightControllerChangeLightState$Response(params, context).pipe(
      map((r: StrictHttpResponse<LightDto>): LightDto => r.body)
    );
  }

  /** Path part for operation `lightControllerLightList()` */
  static readonly LightControllerLightListPath = '/light/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lightControllerLightList()` instead.
   *
   * This method doesn't expect any request body.
   */
  lightControllerLightList$Response(params: LightControllerLightList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<LightDto>;
}>> {
    return lightControllerLightList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `lightControllerLightList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  lightControllerLightList(params: LightControllerLightList$Params, context?: HttpContext): Observable<PaginationOutput & {
'items'?: Array<LightDto>;
}> {
    return this.lightControllerLightList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationOutput & {
'items'?: Array<LightDto>;
}>): PaginationOutput & {
'items'?: Array<LightDto>;
} => r.body)
    );
  }

  /** Path part for operation `lightControllerGetLightState()` */
  static readonly LightControllerGetLightStatePath = '/light/get-state';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lightControllerGetLightState()` instead.
   *
   * This method doesn't expect any request body.
   */
  lightControllerGetLightState$Response(params: LightControllerGetLightState$Params, context?: HttpContext): Observable<StrictHttpResponse<LightDto>> {
    return lightControllerGetLightState(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `lightControllerGetLightState$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  lightControllerGetLightState(params: LightControllerGetLightState$Params, context?: HttpContext): Observable<LightDto> {
    return this.lightControllerGetLightState$Response(params, context).pipe(
      map((r: StrictHttpResponse<LightDto>): LightDto => r.body)
    );
  }

}
