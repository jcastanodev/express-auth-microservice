/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import { IDigitalSign } from './digitalSign.interface';
import { DigitalSignModel } from './digitalSign.model';

const create = async (digitalSign: IDigitalSign): Promise<boolean> => {
  try {
    const newDigitalSign = await DigitalSignModel.create(digitalSign);
    logger.debug(`Digital Sign created: %O`, newDigitalSign);
    return true;
  } catch (err) {
    logger.error(`Digital Sign create err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Digital Sign was not created!');
  }
};

const read = async (id: string): Promise<IDigitalSign> => {
  try {
    logger.debug(`Sent digitalSign._id ${id}`);
    const digitalSign = await DigitalSignModel.findOne({ _id: id });
    return digitalSign as IDigitalSign;
  } catch (err) {
    logger.error(`Digital Sign ${id} read err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, `Digital Sign not found ${id}`);
  }
};

const update = async (digitalSign: IDigitalSign): Promise<IDigitalSign> => {
  try {
    const updatedDigitalSign = await DigitalSignModel.findOneAndUpdate(
      {
        _id:
          typeof digitalSign._id === 'string'
            ? digitalSign._id
            : digitalSign._id.$oid,
      },
      { ...digitalSign },
      { new: true },
    );
    logger.debug(`Digital Sign updated: %O`, updatedDigitalSign);
    return updatedDigitalSign;
  } catch (err) {
    logger.error(`Digital Sign update err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Digital Sign was not updated!');
  }
};

const deleteById = async (id: string): Promise<boolean> => {
  await DigitalSignModel.findByIdAndDelete(id);
  logger.debug(`Digital Sign ${id} has been removed`);
  return true;
};

export { create, read, update, deleteById };
