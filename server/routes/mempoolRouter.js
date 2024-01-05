import express from 'express';
import mempoolController from '../controller/mempoolController.js';

const router = express.Router();

router
  .route('/')
  .get(mempoolController.getMempoolInfo);

export default router;
