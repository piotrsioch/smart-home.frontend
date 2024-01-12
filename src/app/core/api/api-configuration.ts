/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

const url = process.env["API_URL"] || 'http://localhost:4001';
console.log(url);

const test = process.env["TEST"] || 'diffeert';
console.log(test);

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
