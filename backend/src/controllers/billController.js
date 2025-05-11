const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const docxConverter = require('docx-pdf');

exports.generateBill = async (req, res) => {
  const order = req.body;
  console.log('Order:', order)

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: 'INVOICE', bold: true, size: 32 })],
          }),
          new Paragraph({ text: `${order.name} (${order.id})` }),
          new Paragraph({ text: `Date: ${new Date().toLocaleDateString()}` }),
          new Paragraph({ text: `\nBILL TO:` }),
          new Paragraph({ text: `${order.customerDetails.name}` }),
          new Paragraph({ text: `${order.customerDetails.address}` }),
          new Paragraph({ text: `Phone: ${order.customerDetails.phone}` }),
          new Paragraph({ text: `Email: ${order.customerDetails.email}` }),
          new Paragraph({ text: `GST No: ${order.customerDetails.gstNo}` }),
          new Paragraph({ text: `\nPRODUCTS:` }),
          ...order.products.map(
            (p, i) =>
              new Paragraph({
                text: `${i + 1}. ${p.name} (${p.id}) - Qty: ${p.quantity} × ₹${p.rate} = ₹${p.quantity * p.rate}`,
              })
          ),
          new Paragraph({ text: `\nPAYMENT DETAILS:` }),
          new Paragraph({ text: `Total Amount: ${order.totalAmount}` }),
          new Paragraph({ text: `Amount Paid: ${order.amountPaid}` }),
          new Paragraph({ text: `Amount Remaining: ${order.amountRemaining}` }),
          new Paragraph({ text: `Payment Mode: ${order.paymentMode}` }),
          new Paragraph({ text: `\nThank you for your business!` }),
        ],
      },
    ],
  });

  const docxPath = path.join(__dirname, `../temp/${order.id}.docx`);
  const pdfPath = path.join(__dirname, `../temp/${order.id}.pdf`);

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(docxPath, buffer);

  docxConverter(docxPath, pdfPath, (err, result) => {
    if (err) return res.status(500).json({ error: 'Conversion error' });

    res.download(pdfPath, `${order.id}.pdf`, (err) => {
      fs.unlinkSync(docxPath);
      fs.unlinkSync(pdfPath);
    });
  });
};
