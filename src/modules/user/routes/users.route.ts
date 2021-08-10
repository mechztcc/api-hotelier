import { Router } from 'express';
import UsersController from '../controllers/UsersController';

/* Please make Dependecy Injection */
const usersController = new UsersController();

const usersRouter = Router();

usersRouter.get('/', usersController.index);
usersRouter.post('/', usersController.create);

export default usersRouter;
