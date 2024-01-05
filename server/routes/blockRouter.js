import express from 'express';
import blockController from '../controller/blockController.js';

const router = express.Router();

router
  .route('/')
  .get(blockController.getBlockChainInfo);

router
  .route('/height/:height')
  .get(blockController.getBlockByHeight);

router
  .route('/latest')
  .get(blockController.getLatestBlock);

export default router;
