import { Router } from 'express';

import usersRouter from '@modules/user/routes/users.route';
import sessionsRouter from '@modules/user/routes/sessions.router';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
