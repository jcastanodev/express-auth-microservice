import { Router } from 'express';
import cors from 'cors';

import healthCheck from '@components/healthcheck/healthCheck.router';
import user from '@components/account/user/user.router';
import identificationDocument from '@components/account/identificationDocument/identificationDocument.router';
import digitalSign from '@components/feature/digitalSign/digitalSign.router';
import fileSignature from '@components/feature/digitalSign/fileSignature/fileSignature.router';
import customEntity from '@components/feature/customEntity/CustomEntity.router';

// const frontUrl = process.env.APP_FRONT_URL || 'http://localhost:3000';

const router: Router = Router();
router.use('/', cors({ origin: '*' }));
router.use(healthCheck);
router.use(user);
router.use(identificationDocument);
router.use(digitalSign);
router.use(fileSignature);
router.use(customEntity);

export default router;
