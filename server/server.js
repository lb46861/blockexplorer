import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import { bitcoinClientMiddleware } from './middleware/bitcoinClient.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_PORT,
  credentials: true,
  optionSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
})
);
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(bitcoinClientMiddleware);
app.use('/api', router);
