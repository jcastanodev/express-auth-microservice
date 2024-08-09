/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import { CustomEntityInterface } from './interfaces/CustomEntity.interface';
import { CustomEntityModel } from './CustomEntity.schema';

const create = async (
  customEntity: CustomEntityInterface,
): Promise<boolean> => {
  try {
    const newCustomEntity = await CustomEntityModel.create(customEntity);
    logger.debug(`CustomEntity created: %O`, newCustomEntity);
    return true;
  } catch (err) {
    logger.error(`CustomEntity create err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'CustomEntity was not created!');
  }
};

const read = async (id: string): Promise<CustomEntityInterface> => {
  try {
    logger.debug(`Sent customEntity._id ${id}`);
    const customEntity = await CustomEntityModel.findOne({ _id: id });
    return customEntity as CustomEntityInterface;
  } catch (err) {
    logger.error(`CustomEntity ${id} read err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, `CustomEntity not found ${id}`);
  }
};

const update = async (
  customEntity: CustomEntityInterface,
): Promise<CustomEntityInterface> => {
  try {
    const updatedCustomEntity = await CustomEntityModel.findOneAndUpdate(
      {
        _id:
          typeof customEntity._id === 'string'
            ? customEntity._id
            : customEntity._id.$oid,
      },
      { ...customEntity },
      { new: true },
    );
    logger.debug(`CustomEntity updated: %O`, updatedCustomEntity);
    return updatedCustomEntity;
  } catch (err) {
    logger.error(`CustomEntity update err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'CustomEntity was not updated!');
  }
};

const deleteById = async (id: string): Promise<boolean> => {
  await CustomEntityModel.findByIdAndDelete(id);
  logger.debug(`CustomEntity ${id} has been removed`);
  return true;
};

export { create, read, update, deleteById };
