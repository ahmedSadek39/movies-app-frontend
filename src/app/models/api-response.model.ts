import { HttpErrorResponse } from "@angular/common/http";

export interface APIResponse {
  body: any;
  message?: string;
  clientMessage?: string;
  developerMessage?: string;
  statusCode: number;
  [x: string]: any;
}

export interface APIErrorResponse extends HttpErrorResponse {
  error: APIResponse;
}

export interface APIResponseGeneric<T> {
  body: T;
  message: string;
  clientMessage?: string;
  statusCode: number;
  [x: string]: any;
}

