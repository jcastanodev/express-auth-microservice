import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

const createDigitalSignValidation: ValidationSchema = {
  body: Joi.object().keys({
    user: Joi.object().required(),
    identificationDocument: Joi.object().required(),
    rootSignature: Joi.string().required(),
  }),
};

export default createDigitalSignValidation;
