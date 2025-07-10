import express from "express";
import { generatePdf } from "../controllers/invoicePdf";

const router = express.Router();

router.post("/generate-pdf", generatePdf);

export default router;
// This route handles the generation of PDF invoices.