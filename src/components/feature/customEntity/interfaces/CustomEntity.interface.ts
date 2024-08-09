import { MongoIdInterface } from '@interfaces/common/db/MongoId.interface';
import { DatetimeRecordInterface } from '@interfaces/common/db/datetimeRecord.interface';

export interface CustomEntityInterface extends DatetimeRecordInterface {
  _id: string | MongoIdInterface;
  name: string;
  attributes: string;
  methods: string;
}
