import express from 'express';
import transactionController from '../controller/transactionController.js';

const router = express.Router();

router
  .route('/:txId')
  .get(transactionController.getTransactionByTxId);

router
  .route('/fee/:txId')
  .get(transactionController.getTransactionFee);

export default router;
