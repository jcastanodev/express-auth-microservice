import { Response } from 'express';
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import { ApiResponse } from '@interfaces/common/api/apiResponse.interface';

const catchError = (res: Response, error: any) => {
  let code = httpStatus.INTERNAL_SERVER_ERROR;
  if (error as AppError) {
    if (error.httpCode) code = error.httpCode;
    res.status(code);
    return res.send({
      state: false,
      code: code.toString(),
      message: error.message,
    } as ApiResponse);
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR);
  return res.send({
    state: false,
    code: '500',
    message: 'Internal Server Error',
  } as ApiResponse);
};

const sendResponse = (
  res: Response,
  code: number,
  message: string,
  data?: any,
) => {
  res.status(code);
  if (data)
    return res.send({
      state: true,
      code: code.toString(),
      message,
      data,
    } as ApiResponse);
  return res.send({
    state: true,
    code: code.toString(),
    message,
  } as ApiResponse);
};

export { catchError, sendResponse };
