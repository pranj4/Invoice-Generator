// generateInvoice Controller for generating invoices logic
import { Request, Response } from 'express';
import Invoice from '../models/Invoice';
// import { generatePDF } from '../utils/pdfGenerator';

export const generateInvoice = async (req: Request, res: Response) => {
  try {
    const {
      userName,
      userEmail,
      products
    } = req.body;

    // Subtotal
    const subTotal = products.reduce((acc: number, p: any) => {
      return acc + p.rate * p.quantity;
    }, 0);

    const gstAmount = parseFloat((subTotal * 0.18).toFixed(2));
    const totalAmount = parseFloat((subTotal + gstAmount).toFixed(2));

    const processedProducts = products.map((p: any) => ({
      name: p.name,
      rate: p.rate,
      quantity: p.quantity,
      totalAmount: p.rate * p.quantity
    }));

    const invoice = new Invoice({
      userName,
      userEmail,
      products: processedProducts,
      subTotal,
      gstAmount,
      totalAmount
    });

    await invoice.save();

    res.status(201).json({
      message: "Invoice created successfully",
      invoiceId: invoice._id
    });
  } catch (error) {
    console.error("Invoice creation failed:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};