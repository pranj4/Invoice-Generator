import puppeteer from "puppeteer";

export const generatePDFBuffer = async (invoice: any): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #eee; padding: 8px; text-align: left; }
          th { background: #23263A; color: #fff; }
        </style>
      </head>
      <body>
        <h2>Invoice</h2>
        <p>Date: ${invoice.date ? new Date(invoice.date).toLocaleDateString() : ""}</p>
        <table border="1" cellspacing="0" cellpadding="8">
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
            <th>GST (18%)</th>
          </tr>
          ${invoice.products.map((p: any) => `
            <tr>
              <td>${p.name}</td>
              <td>${p.quantity}</td>
              <td>${p.rate}</td>
              <td>₹${p.totalAmount ?? p.total ?? (p.rate * p.quantity)}</td>
              <td>₹${((p.rate * p.quantity) * 0.18).toFixed(2)}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `;

  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdfBuffer;
};