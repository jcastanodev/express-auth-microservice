import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

const createFileSignatureValidation: ValidationSchema = {
  body: Joi.object().keys({
    digitalSign: Joi.object().required(),
    file: Joi.string().required(),
    userSignature: Joi.string().required(),
  }),
};

export default createFileSignatureValidation;
