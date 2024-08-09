import { Router } from 'express';

import AuthMiddleware from '@middlewares/auth.middleware';
import validation from '@core/middlewares/validate.middleware';
import {
  readIdentificationDocument,
  createIdentificationDocument,
  updateIdentificationDocument,
  deleteIdentificationDocument,
} from './identificationDocument.controller';
import createValidation from './createIdentificationDocument.validation';

const router: Router = Router();

router.get(
  '/account/identificationDocument/',
  [AuthMiddleware],
  readIdentificationDocument,
);

router.post(
  '/account/identificationDocument/',
  [AuthMiddleware, validation(createValidation)],
  createIdentificationDocument,
);

router.put(
  '/account/identificationDocument/:id',
  [AuthMiddleware, validation(createValidation)],
  updateIdentificationDocument,
);

router.delete(
  '/account/identificationDocument/:id',
  [AuthMiddleware],
  deleteIdentificationDocument,
);

export default router;
