import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

const CustomEntityValidation: ValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    attributes: Joi.string().required(),
    methods: Joi.string().required(),
  }),
};

export default CustomEntityValidation;
