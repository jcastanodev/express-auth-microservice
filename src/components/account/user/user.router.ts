import { Router } from 'express';

import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import AuthMiddleware from '@middlewares/auth.middleware';
import validation from '@core/middlewares/validate.middleware';
import {
  signInUser,
  signUpUser,
  verifyEmailUser,
  createUser,
  infoUser,
  updateUser,
  deleteUser,
} from './user.controller';
import createUserValidation from './createUser.validation';

const router: Router = Router();

// Sign In
router.post('/account/signin', [], signInUser);

// Sign Up
router.post('/account/signup', [validation(createUserValidation)], signUpUser);

// e.g. createUser request's body is validated and protected by api-key
router.post(
  '/user/',
  [protectedByApiKey, validation(createUserValidation)],
  createUser,
);
router.get('/account/verify/:emailToken', [], verifyEmailUser);
router.get('/account/info', [AuthMiddleware], infoUser);
router.put(
  '/account/:id',
  [protectedByApiKey, validation(createUserValidation)],
  updateUser,
);
router.delete('/account/:id', [protectedByApiKey], deleteUser);

export default router;
