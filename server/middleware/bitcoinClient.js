import Client from 'bitcoin-core';
import dotenv from 'dotenv';
dotenv.config();

const bitcoinClient = new Client({
  port: process.env.BTC_PORT,
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD
});

export const bitcoinClientMiddleware = (req, res, next) => {
  req.bitcoinClient = bitcoinClient;
  next();
};
