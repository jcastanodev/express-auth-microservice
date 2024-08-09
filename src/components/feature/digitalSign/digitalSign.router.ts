import { Router } from 'express';

import AuthMiddleware from '@middlewares/auth.middleware';
import validation from '@core/middlewares/validate.middleware';
import {
  readDigitalSign,
  createDigitalSign,
  updateDigitalSign,
  deleteDigitalSign,
} from './digitalSign.controller';
import createValidation from './createDigitalSign.validation';

const router: Router = Router();

router.get('/digitalSign/', [AuthMiddleware], readDigitalSign);

router.post(
  '/digitalSign/',
  [AuthMiddleware, validation(createValidation)],
  createDigitalSign,
);

router.put(
  '/digitalSign/:id',
  [AuthMiddleware, validation(createValidation)],
  updateDigitalSign,
);

router.delete('/digitalSign/:id', [AuthMiddleware], deleteDigitalSign);

export default router;
