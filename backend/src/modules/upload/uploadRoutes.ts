import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../utils/upload';
const routes = Router();

import uploadController from './UploadController'

routes.post('/', multer(multerConfig).single('file'), uploadController.upload)
routes.get('/', uploadController.index)
routes.get('/:filename', uploadController.show)

export default routes