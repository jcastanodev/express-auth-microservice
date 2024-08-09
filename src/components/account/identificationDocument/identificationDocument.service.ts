/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import { IIdentificationDocument } from './identificationDocument.interface';
import { IdentificationDocumentModel } from './identificationDocument.model';
import { IUser } from '../user/user.interface';

const create = async (
  identificationDocument: IIdentificationDocument,
): Promise<IIdentificationDocument> => {
  try {
    const newIdentificationDocument = await IdentificationDocumentModel.create(
      identificationDocument,
    );
    logger.debug(
      `Identification Document created: %O`,
      newIdentificationDocument,
    );
    return newIdentificationDocument;
  } catch (err) {
    logger.error(`Identification Document create err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Identification Document was not created!',
    );
  }
};

const read = async (id: string): Promise<IIdentificationDocument> => {
  try {
    logger.debug(`Sent identificationDocument._id ${id}`);
    const identificationDocument = await IdentificationDocumentModel.findOne({
      _id: id,
    });
    return identificationDocument as IIdentificationDocument;
  } catch (err) {
    logger.error(`Identification Document ${id} read err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Identification Document not found ${id}`,
    );
  }
};

const readByUser = async (user: IUser): Promise<IIdentificationDocument> => {
  try {
    logger.debug(`Sent Identification Document by user ${user._id}`);
    const identificationDocument = await IdentificationDocumentModel.findOne({
      user,
    });
    return identificationDocument as IIdentificationDocument;
  } catch (err) {
    logger.error(
      `Identification Document by user ${user._id} read err: %O`,
      err.message,
    );
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Identification Document not found ${user._id}`,
    );
  }
};

const update = async (
  identificationDocument: IIdentificationDocument,
): Promise<IIdentificationDocument> => {
  try {
    const updatedIdentificationDocument =
      await IdentificationDocumentModel.findOneAndUpdate(
        {
          _id:
            typeof identificationDocument._id === 'string'
              ? identificationDocument._id
              : identificationDocument._id.$oid,
        },
        { ...identificationDocument },
        { new: true },
      );
    logger.debug(
      `Identification Document updated: %O`,
      updatedIdentificationDocument,
    );
    return updatedIdentificationDocument;
  } catch (err) {
    logger.error(`Identification Document update err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Identification Document was not updated!',
    );
  }
};

const deleteById = async (id: string): Promise<boolean> => {
  await IdentificationDocumentModel.findByIdAndDelete(id);
  logger.debug(`Identification Document ${id} has been removed`);
  return true;
};

export { create, read, readByUser, update, deleteById };
