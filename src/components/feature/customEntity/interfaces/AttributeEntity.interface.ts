import { CommonMongoModelInterface } from '@interfaces/common/db/CommonMongoModel.interface';

export interface AttributeEntityInterface extends CommonMongoModelInterface {
  name: string;
  type: string;
}
