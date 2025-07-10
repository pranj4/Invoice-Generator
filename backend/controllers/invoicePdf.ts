import { Request, Response } from "express";
import puppeteer from "puppeteer";

export const generatePdf = async (req: Request, res: Response) => {
  try {
    const { userName, userEmail, products } = req.body;

    const subTotal = products.reduce((sum: number, p: any) => sum + p.rate * p.quantity, 0);
    const gst = +(subTotal * 0.18).toFixed(2);
    const total = +(subTotal + gst).toFixed(2);

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #fff; }
    .header {
      display: flex; justify-content: space-between; align-items: flex-start;
      padding: 32px 32px 0 32px;
    }
    .logo-title {
      display: flex; flex-direction: column; gap: 4px;
    }
    .logo-title img { height: 40px; }
    .logo-title span { font-size: 22px; font-weight: bold; }
    .logo-title small { color: #888; font-size: 12px; }
    .invoice-title {
      text-align: right;
    }
    .invoice-title h2 {
      margin: 0; font-size: 24px; font-weight: bold;
    }
    .invoice-title small {
      color: #888; font-size: 13px;
    }
    .user-bar {
      margin: 32px 32px 0 32px;
      background: linear-gradient(90deg, #23272f 60%, #1a2e13 100%);
      border-radius: 12px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 32px;
      box-shadow: 0 2px 8px #0001;
    }
    .user-bar .name {
      font-size: 24px;
      color: #b6ff6b;
      font-weight: 600;
    }
    .user-bar .email {
      background: #fff;
      color: #23272f;
      padding: 8px 18px;
      border-radius: 20px;
      font-size: 16px;
      font-weight: 500;
      box-shadow: 0 1px 4px #0002;
    }
    .user-bar .date {
      color: #fff;
      font-size: 15px;
      margin-left: 32px;
    }
    .table-section {
      margin: 32px;
      margin-bottom: 0;
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background: #fff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 8px #0001;
    }
    thead tr {
      background: linear-gradient(90deg, #23272f 60%, #1a2e13 100%);
      color: #fff;
    }
    th, td {
      padding: 14px 16px;
      text-align: left;
      font-size: 16px;
    }
    tbody tr:nth-child(even) {
      background: #f7f7f7;
    }
    tbody tr:nth-child(odd) {
      background: #fff;
    }
    .summary-box {
      float: right;
      margin: 32px 32px 0 0;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px #0001;
      padding: 24px 32px;
      width: 260px;
      font-size: 16px;
      border: 1px solid #eee;
    }
    .summary-box .label {
      color: #888;
      font-size: 15px;
    }
    .summary-box .value {
      float: right;
      font-weight: 500;
      color: #23272f;
    }
    .summary-box .total {
      font-size: 18px;
      font-weight: bold;
      color: #1a2e13;
      margin-top: 12px;
      text-align: right;
    }
    .footer {
      margin: 80px 0 0 0;
      padding: 24px 0;
      background: #23272f;
      color: #fff;
      text-align: center;
      font-size: 15px;
      border-radius: 32px;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
    .date-bottom {
      margin: 32px 0 0 32px;
      font-size: 15px;
      color: #23272f;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-title">
      <img src="https://yourdomain.com/logo-light1.png" alt="Levitation Logo" />
      <span>Levitation</span>
      <small>Infotech</small>
    </div>
    <div class="invoice-title">
      <h2>INVOICE GENERATOR</h2>
      <small>Sample Output should be this</small>
    </div>
  </div>
  <div class="user-bar">
    <div><div class="name">${userName}</div></div>
    <div class="email">${userEmail}</div>
    <div class="date">Date : <b>${new Date().toLocaleDateString()}</b></div>
  </div>
  <div class="table-section">
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        ${products.map((p: any) => `
          <tr>
            <td>${p.name}</td>
            <td>${p.quantity}</td>
            <td>${p.rate}</td>
            <td> ₹ ${p.rate * p.quantity}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>
  <div class="date-bottom">
    Date: <b>${new Date().toLocaleDateString()}</b>
  </div>
  <div class="summary-box">
    <div><span class="label">Total Charges</span><span class="value">$${subTotal}</span></div>
    <div style="clear:both"></div>
    <div><span class="label">GST (18%)</span><span class="value">$${gst}</span></div>
    <div style="clear:both"></div>
    <div class="total">
      Total Amount<br/>
      <span style="color:#2e7d32; font-size:22px;">₹ ${total}</span>
    </div>
  </div>
  
</body>
</html>
    `;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf"
    });
    res.send(pdf);
  } catch (err) {
    console.error("PDF gen failed:", err);
    res.status(500).send("Error generating PDF");
  }
};
