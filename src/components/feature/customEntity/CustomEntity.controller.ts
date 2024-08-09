/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { create, read, update, deleteById } from './CustomEntity.service';
import { CustomEntityInterface } from './interfaces/CustomEntity.interface';

const createCustomEntity = async (req: Request, res: Response) => {
  const customEntity = req.body as CustomEntityInterface;
  await create(customEntity);
  res.status(httpStatus.CREATED);
  return res.send({ message: 'Created' });
};

const readCustomEntity = async (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ message: 'Read', output: await read(req.params.id) });
};

const updateCustomEntity = async (req: Request, res: Response) => {
  const customEntity = req.body as CustomEntityInterface;
  await update(customEntity);
  res.status(httpStatus.OK);
  res.send({ message: 'Updated' });
};

const deleteCustomEntity = async (req: Request, res: Response) => {
  await deleteById(req.params.id);
  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Removed' });
};

export {
  createCustomEntity,
  readCustomEntity,
  updateCustomEntity,
  deleteCustomEntity,
};
