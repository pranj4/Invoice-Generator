import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
});

const invoiceSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    products: [productSchema],
    subTotal: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
