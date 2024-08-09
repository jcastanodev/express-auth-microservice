import mongoose from 'mongoose';
import { IDigitalSign } from './digitalSign.interface';

const digitalSignSchema = new mongoose.Schema<IDigitalSign>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  identificationDocument: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IdentificationDocument',
  },
  rootSignature: { type: String },
  signatures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FileSignature' }],
});

const DigitalSignModel = mongoose.model<IDigitalSign>(
  'DigitalSign',
  digitalSignSchema,
);

// eslint-disable-next-line import/prefer-default-export
export { DigitalSignModel };
