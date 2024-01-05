import blockRouter from './blockRouter.js';
import transactionRouter from './transactionRouter.js';
import mempoolRouter from './mempoolRouter.js';
import express from 'express';

const router = express.Router();

router.use('/block', blockRouter);
router.use('/transaction', transactionRouter);
router.use('/mempool', mempoolRouter);

export default router;
