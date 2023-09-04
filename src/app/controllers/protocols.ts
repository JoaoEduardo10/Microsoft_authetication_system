/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ApiRequest<B> {
  user?: any;
  headers?: any;
  params?: any;
  body?: B;
}

export interface ApiResponse<B> {
  statusCode: number;
  body: B;
}

export interface IController {
  handle(req: ApiRequest<unknown>): Promise<ApiResponse<unknown>>;
}
