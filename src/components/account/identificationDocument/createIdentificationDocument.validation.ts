import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

const createIdentificationDocumentValidation: ValidationSchema = {
  body: Joi.object().keys({
    user: Joi.object().required(),
    file: Joi.string().required(),
    state: Joi.string().required(),
  }),
};

export default createIdentificationDocumentValidation;
