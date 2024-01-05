import asyncHandler from 'express-async-handler';

export const getBlockChainInfo =
asyncHandler(async (req, res) => {
  try {
    const bitcoinClient = req.bitcoinClient;
    const info = await bitcoinClient.getBlockchainInfo();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getBlockByHeight = asyncHandler(async (req, res) => {
  try {
    const bitcoinClient = req.bitcoinClient;
    const { height } = req.params;
    const blockHash = await bitcoinClient.getBlockHash(Number(height));
    const block = await bitcoinClient.getBlock(blockHash);
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getLatestBlock = asyncHandler(async (req, res) => {
  try {
    const bitcoinClient = req.bitcoinClient;
    const blockHash = await bitcoinClient.getBestBlockHash();
    const block = await bitcoinClient.getBlock(blockHash);
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default { getBlockChainInfo, getBlockByHeight, getLatestBlock };
