import { MongoIdInterface } from './MongoId.interface';

export interface MongoModelInterface {
  _id: string | MongoIdInterface;
}
