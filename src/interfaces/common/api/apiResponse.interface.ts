import { Response } from 'express';

export interface ApiResponse extends Response {
  state: boolean;
  code: string;
  message: string;
  data?: any;
}
