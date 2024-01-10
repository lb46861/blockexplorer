import asyncHandler from 'express-async-handler';

export const getAddressInfo =
asyncHandler(async (req, res) => {
  try {
    const { address } = req.params;
    const bitcoinClient = req.bitcoinClient;
    const addressInfo = await bitcoinClient.getAddressInfo(address);
    res.json(addressInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default { getAddressInfo };
