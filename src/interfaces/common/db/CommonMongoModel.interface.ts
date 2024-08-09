import { MongoModelInterface } from './MongoModel.interface';
import { DatetimeRecordInterface } from './datetimeRecord.interface';

export interface CommonMongoModelInterface
  extends MongoModelInterface,
    DatetimeRecordInterface {}
