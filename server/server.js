import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Client from 'bitcoin-core';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
})
);
app.use(express.json());

const PORT = process.env.PORT || 5000;
console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const client = new Client({
  port: process.env.BTC_PORT,
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD
});

client.getBlockchainInfo().then((help) => console.log(help));
