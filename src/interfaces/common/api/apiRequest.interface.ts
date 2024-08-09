import { Request } from 'express';
import { IUser } from '@components/account/user/user.interface';

export interface ApiRequest extends Request {
  user?: IUser;
}
