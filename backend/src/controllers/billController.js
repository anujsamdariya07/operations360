const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType } = require('docx');
const docxConverter = require('docx-pdf');

exports.generateBill = async (req, res) => {
  const order = req.body;
  console.log('Order:', order);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'INVOICE',
                bold: true,
                size: 48,
                underline: {},

              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Order Info
          new Paragraph({
            children: [
              new TextRun({ text: `Invoice ID: `, bold: true }),
              new TextRun(`${order.id}`),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Date: `, bold: true }),
              new TextRun(new Date().toLocaleDateString()),
            ],
          }),
          new Paragraph({ text: '' }),

          // Billing Info
          new Paragraph({ text: 'BILL TO:', bold: true }),
          new Paragraph({ text: `${order.customerDetails.name}` }),
          new Paragraph({ text: `${order.customerDetails.address}` }),
          new Paragraph({ text: `Phone: ${order.customerDetails.phone}` }),
          new Paragraph({ text: `Email: ${order.customerDetails.email}` }),
          new Paragraph({ text: `GST No: ${order.customerDetails.gstNo}` }),
          new Paragraph({ text: '' }),

          // Products Table Header
          new Paragraph({
            text: 'PRODUCTS:',
            bold: true,
          }),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              // Table Header Row
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: 'No.', bold: true })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'Product', bold: true })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'Qty', bold: true })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'Rate', bold: true })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'Total', bold: true })],
                  }),
                ],
              }),
              // Table Data Rows
              ...order.products.map((p, i) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph(`${i + 1}`)] }),
                    new TableCell({ children: [new Paragraph(`${p.name}`)] }),
                    new TableCell({ children: [new Paragraph(`${p.quantity}`)] }),
                    new TableCell({ children: [new Paragraph(`₹${p.rate}`)] }),
                    new TableCell({ children: [new Paragraph(`₹${p.quantity * p.rate}`)] }),
                  ],
                })
              ),
            ],
          }),

          new Paragraph({ text: '' }),

          // Summary
          new Paragraph({ text: 'PAYMENT DETAILS:', bold: true }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: `Total Amount: ₹${order.totalAmount}`, bold: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: `Amount Paid: ₹${order.amountPaid}` }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: `Amount Remaining: ₹${order.amountRemaining}` }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: `Payment Mode: ${order.paymentMode}` }),
            ],
          }),

          new Paragraph({ text: '' }),

          // Thank you
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300 },
            children: [
              new TextRun({ text: 'Thank you for your business!', bold: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'Please contact us if you have any questions.' }),
            ],
          }),
        ],
      },
    ],
  });

  const docxPath = path.join(__dirname, `../temp/${order.id}.docx`);
  const pdfPath = path.join(__dirname, `../temp/${order.id}.pdf`);

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(docxPath, buffer);

  docxConverter(docxPath, pdfPath, (err) => {
    if (err) return res.status(500).json({ error: 'Conversion error' });

    res.download(pdfPath, `${order.id}.pdf`, () => {
      fs.unlinkSync(docxPath);
      fs.unlinkSync(pdfPath);
    });
  });
};
