import { calculateTransactionFee, generateVInData, generateVOutData } from '../utils/calculations.js';

export const retrieveTransactionData = (rawTx) => {
  const [_fee, sumOutput] = calculateTransactionFee(rawTx);
  const vIns = generateVInData(rawTx);
  const vOuts = generateVOutData(rawTx);

  const data = {
    hash: rawTx.hash,
    blockHash: rawTx.blockhash,
    confirmations: rawTx.confirmations,
    fee: rawTx.fee,
    receivedDate: new Date(rawTx.time * 1000),
    amount: sumOutput,
    vIns,
    vOuts
  };

  return data;
};
