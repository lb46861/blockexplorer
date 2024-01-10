import { calculateTransactionFee } from '../utils/calculations.js';

const _calculateCoins = (rawTransactions) => {
  let totalSent = 0;
  let totalFees = 0;
  for (const rawTx of rawTransactions) {
    const { vout } = rawTx;
    const valueOut = vout.reduce((total, output) => total + output?.value || 0, 0);
    totalSent += valueOut;

    const fee = calculateTransactionFee(rawTx);
    totalFees += fee;
  }
  return [totalSent, totalFees];
};

const generateIsoTime = (time) => {
  const date = new Date(time * 1000);
  const isoTime = date.toISOString();
  return isoTime;
};

export const getBlockData = async (bitcoinClient, blocks) => {
  const blockData = await Promise.all(blocks.map(async (block) => {
    // const rawTransactions = await Promise.all(
    //   block.tx.map((txid) => bitcoinClient.getRawTransaction(txid, 2))
    // );
    // const [totalSent, totalFees] = calculateCoins(rawTransactions);

    const blockStats = await bitcoinClient.getBlockStats(block.hash);
    const isoTime = generateIsoTime(block.time);

    return {
      height: block.height,
      confirmations: block.confirmations,
      ntx: block.ntx,
      age: isoTime,
      nTx: block.nTx,
      totalSent: blockStats.total_out / 100000000,
      totalFees: blockStats.totalfee / 100000000,
      size: block.size
    };
  }));

  return blockData;
};
