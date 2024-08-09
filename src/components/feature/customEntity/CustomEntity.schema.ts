import mongoose from 'mongoose';
import { CustomEntityInterface } from './interfaces/CustomEntity.interface';

const CustomEntitySchema = new mongoose.Schema<CustomEntityInterface>({
  name: { type: String },
  attributes: { type: String },
  methods: { type: String },
});

const CustomEntityModel = mongoose.model<CustomEntityInterface>(
  'CustomEntity',
  CustomEntitySchema,
);

// eslint-disable-next-line import/prefer-default-export
export { CustomEntityModel };
