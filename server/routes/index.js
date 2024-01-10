import blockRouter from './blockRouter.js';
import transactionRouter from './transactionRouter.js';
import mempoolRouter from './mempoolRouter.js';
import addressRouter from './addressRouter.js';

import express from 'express';

const router = express.Router();

router.use('/block', blockRouter);
router.use('/transaction', transactionRouter);
router.use('/mempool', mempoolRouter);
router.use('/address', addressRouter);

export default router;
