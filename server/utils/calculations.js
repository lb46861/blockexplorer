export const calculateTransactionFee = (rawTx) => {
  let sumInput = 0;
  let sumOutput = 0;

  for (const output of rawTx.vout) {
    if (output?.value) sumOutput += output.value;
  }

  for (const inp of rawTx.vin) {
    if (inp.prevout?.value) sumInput += inp.prevout.value;
  }

  let fee = sumInput - sumOutput;
  fee = fee < 0 ? 0 : fee;
  return [fee, sumOutput];
};

export const generateVInData = (rawTx) => {
  const vIns = rawTx.vin.map((vin) => {
    return {
      txId: vin.txid,
      value: vin.prevout?.value || 0,
      address: vin.prevout?.scriptPubKey?.address || 'From Block Reward'
    };
  });
  return vIns;
};

export const generateVOutData = (rawTx) => {
  const vOuts = rawTx.vout.map((vout) => {
    return {
      value: vout?.value || 0,
      address: vout?.scriptPubKey?.address || 'Null Data Transaction'
    };
  });
  return vOuts;
};
