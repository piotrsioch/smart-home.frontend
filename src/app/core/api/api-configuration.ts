/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

const url = environment.apiUrl || 'no access';
console.log(url);

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = url;
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
