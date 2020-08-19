import { Router } from 'express';

import uploadRoutes from '../upload/uploadRoutes';

const routes = Router();

routes.use('/upload', uploadRoutes)

export default routes