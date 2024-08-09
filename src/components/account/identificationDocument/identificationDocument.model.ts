import mongoose from 'mongoose';
import { IIdentificationDocument } from './identificationDocument.interface';

const identificationDocumentSchema =
  new mongoose.Schema<IIdentificationDocument>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    file: { type: String },
    state: { type: String },
  });

const IdentificationDocumentModel = mongoose.model<IIdentificationDocument>(
  'IdentificationDocument',
  identificationDocumentSchema,
);

// eslint-disable-next-line import/prefer-default-export
export { IdentificationDocumentModel };
