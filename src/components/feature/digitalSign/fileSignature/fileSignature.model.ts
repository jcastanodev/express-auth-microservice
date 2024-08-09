import mongoose from 'mongoose';
import { IFileSignature } from './fileSignature.interface';

const fileSignatureSchema = new mongoose.Schema<IFileSignature>({
  digitalSign: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DigitalSign' }],
  file: { type: String },
  userSignature: { type: String },
});

const FileSignatureModel = mongoose.model<IFileSignature>(
  'FileSignature',
  fileSignatureSchema,
);

// eslint-disable-next-line import/prefer-default-export
export { FileSignatureModel };
