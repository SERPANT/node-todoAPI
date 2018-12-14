import { Router } from 'express';

import * as todoController from '../controllers/todo';
import * as tokenController from '../controllers/token';

import tokenExtraction from '../utils/tokenExtractor';
import * as tokenAthenticate from '../utils/tokenAthenticate';

import * as todoValidator from '../validators/todoValidator';
import * as userValidator from '../validators/userNameValidator';
const router = Router();

//GET Request

/**
 * GET /api/todo/
 * GET all the todo  : for testing
 */
router.get('/', tokenExtraction, tokenAthenticate.accToken, todoController.fetchAll);

/**
 * GET /api/todo/todoList
 * GET all the todo of the signedin user
 */
router.get('/todoList', tokenExtraction, tokenAthenticate.accToken, todoController.fetchById);

/**
 * GET /api/todo/users
 * GET all incomplete todo of the signedin user
 */
router.get('/todoList/unfinish', tokenExtraction, tokenAthenticate.accToken, todoController.fetchUnfinishById);

/**
 * GET /api/todo/todoList/complete
 * GET  all the completed todo of the signedIn user
 */
router.get('/todoList/complete', tokenExtraction, tokenAthenticate.accToken, todoController.fetchCompletedById);

//POST Request
/**
 * POST /api/todo
 */
router.post('/', tokenExtraction, tokenAthenticate.accToken, todoValidator.createTodoValidator, todoController.create);

/**
 * POST /api/todo/token
 */
router.post('/token', tokenExtraction, tokenAthenticate.refToken, tokenController.createAccessToken);

/**
 * POST /api/todo/login
 */
router.post('/login', userValidator.userNameValidator, userValidator.findUserName, tokenController.createRefreshToken);

/**
 * PUT /api/todo
 */
router.put('/', tokenExtraction, tokenAthenticate.accToken, (req, res, next) => {
  res.send('trying to modify todo');
});

/**
 * DELETE /api/todo/:id
 * delete todo with given ID
 */
router.delete('/:id', tokenExtraction, tokenAthenticate.accToken, todoController.deleteTodo);

/**
 * PATCH /api/todo/:id
 * Update todo with given ID
 */
router.patch('/update/:id', tokenExtraction, tokenAthenticate.accToken, todoController.update);

export default router;
