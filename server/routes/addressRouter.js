import express from 'express';
import addressController from '../controller/addressController.js';

const router = express.Router();

router
  .route('/:address')
  .get(addressController.getAddressInfo);

export default router;
