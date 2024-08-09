import { MongoIdInterface } from '@interfaces/common/db/MongoId.interface';
import { DatetimeRecordInterface } from '@interfaces/common/db/datetimeRecord.interface';
import { IDigitalSign } from '@components/feature/digitalSign/digitalSign.interface';

export interface IFileSignature extends DatetimeRecordInterface {
  _id: string | MongoIdInterface;
  digitalSign: IDigitalSign[];
  file: string;
  userSignature: string;
}
