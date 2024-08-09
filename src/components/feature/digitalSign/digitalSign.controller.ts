/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  create,
  read,
  update,
  deleteById,
} from '@components/feature/digitalSign/digitalSign.service';
import { IDigitalSign } from './digitalSign.interface';

const createDigitalSign = async (req: Request, res: Response) => {
  const digitalSign = req.body as IDigitalSign;
  await create(digitalSign);
  res.status(httpStatus.CREATED);
  return res.send({ message: 'Created' });
};

const readDigitalSign = async (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ message: 'Read', output: await read(req.params.id) });
};

const updateDigitalSign = async (req: Request, res: Response) => {
  const digitalSign = req.body as IDigitalSign;
  await update(digitalSign);
  res.status(httpStatus.OK);
  res.send({ message: 'Updated' });
};

const deleteDigitalSign = async (req: Request, res: Response) => {
  await deleteById(req.params.id);
  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Removed' });
};

export {
  createDigitalSign,
  readDigitalSign,
  updateDigitalSign,
  deleteDigitalSign,
};
