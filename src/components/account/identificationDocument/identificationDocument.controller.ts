/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import httpStatus from 'http-status';
import { sendResponse, catchError } from '@utils/ApiUtils';
import { ApiRequest } from '@interfaces/common/api/apiRequest.interface';
import { ApiResponse } from '@interfaces/common/api/apiResponse.interface';
import logger from '@core/utils/logger';
import { IIdentificationDocument } from './identificationDocument.interface';
import {
  create,
  read,
  readByUser,
  update,
  deleteById,
} from './identificationDocument.service';

const createIdentificationDocument = async (
  req: ApiRequest,
  res: ApiResponse,
) => {
  try {
    const identificationDocument = req.body as IIdentificationDocument;
    if (!identificationDocument.user) {
      identificationDocument.user = req.user;
    }
    const response = await create(identificationDocument);
    return sendResponse(res, httpStatus.CREATED, 'Created', response);
  } catch (error) {
    logger.error(error);
    return catchError(res, error);
  }
};

const readIdentificationDocument = async (
  req: ApiRequest,
  res: ApiResponse,
) => {
  try {
    let response;
    if (req.params.id) {
      response = await read(req.params.id);
    } else if (req.user) {
      response = await readByUser(req.user);
    } else {
      return sendResponse(res, httpStatus.BAD_REQUEST, 'Bad request');
    }
    return sendResponse(
      res,
      httpStatus.OK,
      response ? 'Success' : 'Not found results',
      response,
    );
  } catch (error) {
    logger.error(error);
    return catchError(res, error);
  }
};

const updateIdentificationDocument = async (
  req: ApiRequest,
  res: ApiResponse,
) => {
  const identificationDocument = req.body as IIdentificationDocument;
  await update(identificationDocument);
  res.status(httpStatus.OK);
  res.send({ message: 'Updated' });
};

const deleteIdentificationDocument = async (
  req: ApiRequest,
  res: ApiResponse,
) => {
  await deleteById(req.params.id);
  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Removed' });
};

export {
  createIdentificationDocument,
  readIdentificationDocument,
  updateIdentificationDocument,
  deleteIdentificationDocument,
};
