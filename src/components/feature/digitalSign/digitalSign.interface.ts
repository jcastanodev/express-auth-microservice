import { IUser } from '@components/account/user/user.interface';
import { MongoIdInterface } from '@interfaces/common/db/MongoId.interface';
import { DatetimeRecordInterface } from '@interfaces/common/db/datetimeRecord.interface';
import { IIdentificationDocument } from '@components/account/identificationDocument/identificationDocument.interface';
import { IFileSignature } from '@components/feature/digitalSign/fileSignature/fileSignature.interface';

export interface IDigitalSign extends DatetimeRecordInterface {
  _id: string | MongoIdInterface;
  user: IUser;
  identificationDocument: IIdentificationDocument;
  rootSignature: string;
  signatures: IFileSignature[];
}
