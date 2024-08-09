import { Router } from 'express';

import AuthMiddleware from 'middlewares/auth.middleware';
import validation from '@core/middlewares/validate.middleware';
import {
  readFileSignature,
  createFileSignature,
  updateFileSignature,
  deleteFileSignature,
} from './fileSignature.controller';
import createValidation from './createFileSignature.validation';

const router: Router = Router();

router.get('/digitalSign/fileSignature/', [AuthMiddleware], readFileSignature);

router.post(
  '/digitalSign/fileSignature/',
  [AuthMiddleware, validation(createValidation)],
  createFileSignature,
);

router.put(
  '/digitalSign/fileSignature/:id',
  [AuthMiddleware, validation(createValidation)],
  updateFileSignature,
);

router.delete(
  '/digitalSign/fileSignature/:id',
  [AuthMiddleware],
  deleteFileSignature,
);

export default router;
