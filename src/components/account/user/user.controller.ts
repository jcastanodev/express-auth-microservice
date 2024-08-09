/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import httpStatus from 'http-status';
import {
  signIn,
  signUp,
  verifyEmail,
  create,
  read,
  update,
  deleteById,
} from '@components/account/user/user.service';
import { IUser } from '@components/account/user/user.interface';
import { sendResponse, catchError } from '@utils/ApiUtils';
import logger from '@core/utils/logger';
import { ApiRequest } from '@interfaces/common/api/apiRequest.interface';
import { ApiResponse } from '@interfaces/common/api/apiResponse.interface';

const signInUser = async (req: ApiRequest, res: ApiResponse) => {
  try {
    const user = req.body as IUser;
    const response = await signIn(user);
    return sendResponse(res, httpStatus.CREATED, 'Success', response);
  } catch (error) {
    logger.error(error);
    return catchError(res, error);
  }
};

const signUpUser = async (req: ApiRequest, res: ApiResponse) => {
  try {
    const user = req.body as IUser;
    const newUser: IUser = await signUp(user);
    return sendResponse(res, httpStatus.CREATED, 'Created', newUser);
  } catch (error) {
    logger.error(error);
    return catchError(res, error);
  }
};

const verifyEmailUser = async (req: ApiRequest, res: ApiResponse) => {
  try {
    const response = await verifyEmail(req.params.emailToken);
    return sendResponse(res, httpStatus.OK, 'Verified', response);
  } catch (error) {
    logger.error(error);
    return catchError(res, error);
  }
};

const infoUser = async (req: ApiRequest, res: ApiResponse) => {
  try {
    const response = await read(req.user._id);
    logger.debug('User info: %O', response);
    return sendResponse(res, httpStatus.OK, 'Read', response);
  } catch (error) {
    logger.error(error);
    return catchError(res, error);
  }
};

const createUser = async (req: ApiRequest, res: ApiResponse) => {
  const user = req.body as IUser;
  await create(user);
  res.status(httpStatus.CREATED);
  return res.send({ message: 'Created' });
};

const readUser = async (req: ApiRequest, res: ApiResponse) => {
  res.status(httpStatus.OK);
  res.send({ message: 'Read', output: await read(req.params.id) });
};

const updateUser = async (req: ApiRequest, res: ApiResponse) => {
  const user = req.body as IUser;
  await update(user);
  res.status(httpStatus.OK);
  res.send({ message: 'Updated' });
};

const deleteUser = async (req: ApiRequest, res: ApiResponse) => {
  await deleteById(req.params.email);
  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Removed' });
};

export {
  signInUser,
  signUpUser,
  verifyEmailUser,
  infoUser,
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
