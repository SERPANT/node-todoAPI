import { Router } from 'express';

import tokenExtraction from '../utils/tokenExtractor';
import * as tokenAthenticate from '../utils/tokenAthenticate';

import * as userController from '../controllers/users';
import * as userValidator from '../validators/userNameValidator';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', tokenExtraction, tokenAthenticate.accToken, userController.fetchById);

/**
 * GET /api/users/:id
 */
// router.get('/:id', tokenExtraction, tokenAthenticate.accToken,userController.fetchById);

/**
 * POST /api/users
 */
router.post('/create', userValidator.userNameValidator, userController.create);

/**
 * PUT /api/users/:id
 */
// router.put('/:id', findUser, userValidator, userController.update);

/**
 * DELETE /api/users/:id
 */
// router.delete('/:id', findUser, userController.deleteUser);

export default router;
