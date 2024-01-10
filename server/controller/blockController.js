import asyncHandler from 'express-async-handler';
import { getBlockData } from '../service/blockService.js';
import { retrieveTransactionData } from '../service/transactionService.js';

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
    const { page = 1, limit = 10 } = req.query;

    const blockHash = await bitcoinClient.getBlockHash(Number(height));
    const block = await bitcoinClient.getBlock(blockHash);

    const totalPages = Math.ceil(block.tx.length / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const txIds = block.tx.slice(startIndex, endIndex);

    const txList = [];
    for (const txId of txIds) {
      const rawTx = await bitcoinClient.getRawTransaction(txId, 2);
      const rawTxData = retrieveTransactionData(rawTx);

      txList.push(rawTxData);
    }

    res.status(200).json({ block, txList, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getBlockByHash = asyncHandler(async (req, res) => {
  try {
    const bitcoinClient = req.bitcoinClient;

    const { page = 1, limit = 10 } = req.query;
    const { hash } = req.params;

    const block = await bitcoinClient.getBlock(hash);

    const totalPages = Math.ceil(block.tx.length / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const txIds = block.tx.slice(startIndex, endIndex);

    const txList = [];
    for (const txId of txIds) {
      const rawTx = await bitcoinClient.getRawTransaction(txId, 2);
      const rawTxData = retrieveTransactionData(rawTx);

      txList.push(rawTxData);
    }

    res.status(200).json({ block, txList, totalPages });
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

export const getLastTenBlocks = asyncHandler(async (req, res) => {
  try {
    const bitcoinClient = req.bitcoinClient;
    const latestBlockHash = await bitcoinClient.getBestBlockHash();
    const latestBlock = await bitcoinClient.getBlock(latestBlockHash);

    const blocks = [latestBlock];
    for (let i = 1; i < 10; i++) {
      const blockHash = await bitcoinClient.getBlockHash(latestBlock.height - i);
      const block = await bitcoinClient.getBlock(blockHash);
      blocks.push(block);
    }

    const blockData = await getBlockData(bitcoinClient, blocks);

    res.json(blockData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default { getBlockChainInfo, getBlockByHeight, getLatestBlock, getLastTenBlocks, getBlockByHash };
