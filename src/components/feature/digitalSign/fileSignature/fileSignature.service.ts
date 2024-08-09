/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import { IFileSignature } from './fileSignature.interface';
import { FileSignatureModel } from './fileSignature.model';

const create = async (fileSignature: IFileSignature): Promise<boolean> => {
  try {
    const newFileSignature = await FileSignatureModel.create(fileSignature);
    logger.debug(`File Signature created: %O`, newFileSignature);
    return true;
  } catch (err) {
    logger.error(`File Signature create err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'File Signature was not created!',
    );
  }
};

const read = async (id: string): Promise<IFileSignature> => {
  try {
    logger.debug(`Sent fileSignature._id ${id}`);
    const fileSignature = await FileSignatureModel.findOne({ _id: id });
    return fileSignature as IFileSignature;
  } catch (err) {
    logger.error(`File Signature ${id} read err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `File Signature not found ${id}`,
    );
  }
};

const update = async (
  fileSignature: IFileSignature,
): Promise<IFileSignature> => {
  try {
    const updatedfileSignature = await FileSignatureModel.findOneAndUpdate(
      {
        _id:
          typeof fileSignature._id === 'string'
            ? fileSignature._id
            : fileSignature._id.$oid,
      },
      { ...fileSignature },
      { new: true },
    );
    logger.debug(`File Signature updated: %O`, updatedfileSignature);
    return updatedfileSignature;
  } catch (err) {
    logger.error(`File Signature update err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'File Signature was not updated!',
    );
  }
};

const deleteById = async (id: string): Promise<boolean> => {
  await FileSignatureModel.findByIdAndDelete(id);
  logger.debug(`File Signature ${id} has been removed`);
  return true;
};

export { create, read, update, deleteById };
