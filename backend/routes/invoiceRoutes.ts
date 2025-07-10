import express from 'express';
import { generateInvoice } from '../controllers/invoiceController';


const router = express.Router();

router.post('/', generateInvoice);

export default router;