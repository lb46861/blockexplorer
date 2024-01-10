import asyncHandler from 'express-async-handler';
import { calculateTransactionFee } from '../utils/calculations.js';
import { retrieveTransactionData } from '../service/transactionService.js';

export const getTransactionByTxId = asyncHandler(async (req, res) => {
  try {
    const bitcoinClient = req.bitcoinClient;
    const { txId } = req.params;

    const rawTx = await bitcoinClient.getRawTransaction(txId, 2);
    const block = await bitcoinClient.getBlock(rawTx.blockhash);

    const data = retrieveTransactionData(rawTx);
    data.blockHeight = block.height;

    res.json({
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getTransactionFee = asyncHandler(async (req, res) => {
  try {
    const bitcoinClient = req.bitcoinClient;
    const { txId } = req.params;
    const rawTx = await bitcoinClient.getRawTransaction(txId, 2);
    const [fee, sumOutput] = calculateTransactionFee(rawTx);

    res.json({ fee, sumOutput });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default { getTransactionByTxId, getTransactionFee };
