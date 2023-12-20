/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { PaginationOutput } from '../models/pagination-output';
import { roomControllerAssignSensorToRoom } from '../fn/room/room-controller-assign-sensor-to-room';
import { RoomControllerAssignSensorToRoom$Params } from '../fn/room/room-controller-assign-sensor-to-room';
import { roomControllerCreateRoom } from '../fn/room/room-controller-create-room';
import { RoomControllerCreateRoom$Params } from '../fn/room/room-controller-create-room';
import { roomControllerDeleteRoom } from '../fn/room/room-controller-delete-room';
import { RoomControllerDeleteRoom$Params } from '../fn/room/room-controller-delete-room';
import { roomControllerGetLatestData } from '../fn/room/room-controller-get-latest-data';
import { RoomControllerGetLatestData$Params } from '../fn/room/room-controller-get-latest-data';
import { roomControllerReedSwitchList } from '../fn/room/room-controller-reed-switch-list';
import { RoomControllerReedSwitchList$Params } from '../fn/room/room-controller-reed-switch-list';
import { roomControllerRemoveSensorFromRoom } from '../fn/room/room-controller-remove-sensor-from-room';
import { RoomControllerRemoveSensorFromRoom$Params } from '../fn/room/room-controller-remove-sensor-from-room';
import { RoomDto } from '../models/room-dto';
import { SuccessDto } from '../models/success-dto';

@Injectable({ providedIn: 'root' })
export class RoomService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `roomControllerReedSwitchList()` */
  static readonly RoomControllerReedSwitchListPath = '/room/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `roomControllerReedSwitchList()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomControllerReedSwitchList$Response(params: RoomControllerReedSwitchList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<RoomDto>;
}>> {
    return roomControllerReedSwitchList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `roomControllerReedSwitchList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomControllerReedSwitchList(params: RoomControllerReedSwitchList$Params, context?: HttpContext): Observable<PaginationOutput & {
'items'?: Array<RoomDto>;
}> {
    return this.roomControllerReedSwitchList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationOutput & {
'items'?: Array<RoomDto>;
}>): PaginationOutput & {
'items'?: Array<RoomDto>;
} => r.body)
    );
  }

  /** Path part for operation `roomControllerGetLatestData()` */
  static readonly RoomControllerGetLatestDataPath = '/room/get-by-id';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `roomControllerGetLatestData()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomControllerGetLatestData$Response(params: RoomControllerGetLatestData$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
    return roomControllerGetLatestData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `roomControllerGetLatestData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomControllerGetLatestData(params: RoomControllerGetLatestData$Params, context?: HttpContext): Observable<RoomDto> {
    return this.roomControllerGetLatestData$Response(params, context).pipe(
      map((r: StrictHttpResponse<RoomDto>): RoomDto => r.body)
    );
  }

  /** Path part for operation `roomControllerCreateRoom()` */
  static readonly RoomControllerCreateRoomPath = '/room/create-room';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `roomControllerCreateRoom()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  roomControllerCreateRoom$Response(params: RoomControllerCreateRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
    return roomControllerCreateRoom(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `roomControllerCreateRoom$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  roomControllerCreateRoom(params: RoomControllerCreateRoom$Params, context?: HttpContext): Observable<RoomDto> {
    return this.roomControllerCreateRoom$Response(params, context).pipe(
      map((r: StrictHttpResponse<RoomDto>): RoomDto => r.body)
    );
  }

  /** Path part for operation `roomControllerDeleteRoom()` */
  static readonly RoomControllerDeleteRoomPath = '/room/delete-room';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `roomControllerDeleteRoom()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  roomControllerDeleteRoom$Response(params: RoomControllerDeleteRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<SuccessDto>> {
    return roomControllerDeleteRoom(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `roomControllerDeleteRoom$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  roomControllerDeleteRoom(params: RoomControllerDeleteRoom$Params, context?: HttpContext): Observable<SuccessDto> {
    return this.roomControllerDeleteRoom$Response(params, context).pipe(
      map((r: StrictHttpResponse<SuccessDto>): SuccessDto => r.body)
    );
  }

  /** Path part for operation `roomControllerAssignSensorToRoom()` */
  static readonly RoomControllerAssignSensorToRoomPath = '/room/assign-sensor-to-room';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `roomControllerAssignSensorToRoom()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  roomControllerAssignSensorToRoom$Response(params: RoomControllerAssignSensorToRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
    return roomControllerAssignSensorToRoom(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `roomControllerAssignSensorToRoom$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  roomControllerAssignSensorToRoom(params: RoomControllerAssignSensorToRoom$Params, context?: HttpContext): Observable<RoomDto> {
    return this.roomControllerAssignSensorToRoom$Response(params, context).pipe(
      map((r: StrictHttpResponse<RoomDto>): RoomDto => r.body)
    );
  }

  /** Path part for operation `roomControllerRemoveSensorFromRoom()` */
  static readonly RoomControllerRemoveSensorFromRoomPath = '/room/remove-sensor-from-room';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `roomControllerRemoveSensorFromRoom()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  roomControllerRemoveSensorFromRoom$Response(params: RoomControllerRemoveSensorFromRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
    return roomControllerRemoveSensorFromRoom(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `roomControllerRemoveSensorFromRoom$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  roomControllerRemoveSensorFromRoom(params: RoomControllerRemoveSensorFromRoom$Params, context?: HttpContext): Observable<RoomDto> {
    return this.roomControllerRemoveSensorFromRoom$Response(params, context).pipe(
      map((r: StrictHttpResponse<RoomDto>): RoomDto => r.body)
    );
  }

}
