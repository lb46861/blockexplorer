import asyncHandler from 'express-async-handler';

const calculateTransactionFee = (bitcoinClient, rawTx) => {
  try {
    let sumInput = 0;
    let sumOutput = 0;

    for (const output of rawTx.vout) {
      sumOutput += output.value;
    }

    for (const inp of rawTx.vin) {
      sumInput += inp.prevout.value;
    }

    const fee = sumInput - sumOutput;
    return fee;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTransactionByTxId = asyncHandler(async (req, res) => {
  try {
    const bitcoinClient = req.bitcoinClient;
    const { txId } = req.params;
    const rawTx = await bitcoinClient.getRawTransaction(txId, 2);
    const fee = calculateTransactionFee(bitcoinClient, rawTx);
    res.json({
      rawTx, fee
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
    const fee = calculateTransactionFee(bitcoinClient, rawTx);
    res.json({ fee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default { getTransactionByTxId, getTransactionFee };
