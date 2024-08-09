import { MongoIdInterface } from '@interfaces/common/db/MongoId.interface';
import { DatetimeRecordInterface } from '@interfaces/common/db/datetimeRecord.interface';
import { StateRecordType } from '@interfaces/common/db/stateRecord.type';
import { IUser } from '@components/account/user/user.interface';

export interface IIdentificationDocument extends DatetimeRecordInterface {
  _id?: string | MongoIdInterface;
  user?: IUser;
  file: string;
  state: StateRecordType | 'pendingVerification';
}
