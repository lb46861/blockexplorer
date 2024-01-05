import asyncHandler from 'express-async-handler';

export const getMempoolInfo = asyncHandler(async (req, res) => {
  try {
    const bitcoinClient = req.bitcoinClient;
    const info = await bitcoinClient.getMempoolInfo();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default { getMempoolInfo };
