/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { create, read, update, deleteById } from './fileSignature.service';
import { IFileSignature } from './fileSignature.interface';

const createFileSignature = async (req: Request, res: Response) => {
  const fileSignature = req.body as IFileSignature;
  await create(fileSignature);
  res.status(httpStatus.CREATED);
  return res.send({ message: 'Created' });
};

const readFileSignature = async (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ message: 'Read', output: await read(req.params.id) });
};

const updateFileSignature = async (req: Request, res: Response) => {
  const fileSignature = req.body as IFileSignature;
  await update(fileSignature);
  res.status(httpStatus.OK);
  res.send({ message: 'Updated' });
};

const deleteFileSignature = async (req: Request, res: Response) => {
  await deleteById(req.params.id);
  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Removed' });
};

export {
  createFileSignature,
  readFileSignature,
  updateFileSignature,
  deleteFileSignature,
};
