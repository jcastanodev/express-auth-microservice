import { IUser } from '@components/account/user/user.interface';

export interface JwtUser {
  user: IUser;
  expiresIn: string;
  iat?: number;
}
