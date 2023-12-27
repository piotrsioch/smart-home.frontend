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
import { roomControllerGetRoomById } from '../fn/room/room-controller-get-room-by-id';
import { RoomControllerGetRoomById$Params } from '../fn/room/room-controller-get-room-by-id';
import { roomControllerRemoveSensorFromRoom } from '../fn/room/room-controller-remove-sensor-from-room';
import { RoomControllerRemoveSensorFromRoom$Params } from '../fn/room/room-controller-remove-sensor-from-room';
import { roomControllerRoomList } from '../fn/room/room-controller-room-list';
import { RoomControllerRoomList$Params } from '../fn/room/room-controller-room-list';
import { RoomDto } from '../models/room-dto';
import { SuccessDto } from '../models/success-dto';

@Injectable({ providedIn: 'root' })
export class RoomService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `roomControllerRoomList()` */
  static readonly RoomControllerRoomListPath = '/room/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `roomControllerRoomList()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomControllerRoomList$Response(params: RoomControllerRoomList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<RoomDto>;
}>> {
    return roomControllerRoomList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `roomControllerRoomList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomControllerRoomList(params: RoomControllerRoomList$Params, context?: HttpContext): Observable<PaginationOutput & {
'items'?: Array<RoomDto>;
}> {
    return this.roomControllerRoomList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationOutput & {
'items'?: Array<RoomDto>;
}>): PaginationOutput & {
'items'?: Array<RoomDto>;
} => r.body)
    );
  }

  /** Path part for operation `roomControllerGetRoomById()` */
  static readonly RoomControllerGetRoomByIdPath = '/room/get-by-id';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `roomControllerGetRoomById()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomControllerGetRoomById$Response(params: RoomControllerGetRoomById$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
    return roomControllerGetRoomById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `roomControllerGetRoomById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomControllerGetRoomById(params: RoomControllerGetRoomById$Params, context?: HttpContext): Observable<RoomDto> {
    return this.roomControllerGetRoomById$Response(params, context).pipe(
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
