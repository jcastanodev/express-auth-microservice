import { Router } from 'express';

import AuthMiddleware from '@middlewares/auth.middleware';
import validation from '@core/middlewares/validate.middleware';
import {
  readCustomEntity,
  createCustomEntity,
  updateCustomEntity,
  deleteCustomEntity,
} from './CustomEntity.controller';
import createValidation from './CustomEntity.validation';

const router: Router = Router();

router.get('/customEntity', [AuthMiddleware], readCustomEntity);

router.post(
  '/customEntity',
  [AuthMiddleware, validation(createValidation)],
  createCustomEntity,
);

router.put(
  '/customEntity/:id',
  [AuthMiddleware, validation(createValidation)],
  updateCustomEntity,
);

router.delete('/customEntity/:id', [AuthMiddleware], deleteCustomEntity);

export default router;
