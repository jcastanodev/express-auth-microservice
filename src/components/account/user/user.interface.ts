import { MongoIdInterface } from '@interfaces/common/db/MongoId.interface';

export interface IUser {
  _id: string | MongoIdInterface;
  name: string | undefined;
  email: string;
  password: string;
  verified: string;
}
