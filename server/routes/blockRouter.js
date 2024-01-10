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
  .route('/hash/:hash')
  .get(blockController.getBlockByHash);

router
  .route('/latest')
  .get(blockController.getLatestBlock);

router
  .route('/lastfiveblocks')
  .get(blockController.getLastFiveBlocks);

export default router;
