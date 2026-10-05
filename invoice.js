const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument({
  size: "A4",
  margin: 50,
});

doc.pipe(fs.createWriteStream("invoice.pdf"));

// ========================
// Invoice Data
// ========================

const invoice = {
  invoiceNumber: "INV-2026-001",
  date: "October 5, 2026",
  dueDate: "October 20, 2026",

  company: {
    name: "Harsha Technologies",
    address: "123 Main Street, Bangalore, India",
    email: "hello@harshatech.com",
    phone: "+91 98765 43210",
  },

  customer: {
    name: "Rahul Kumar",
    address: "45 MG Road, Hyderabad, India",
    email: "rahul@example.com",
  },

  items: [
    {
      description: "MERN Stack Development",
      quantity: 1,
      price: 50000,
    },
    {
      description: "UI/UX Design",
      quantity: 1,
      price: 15000,
    },
    {
      description: "API Integration",
      quantity: 2,
      price: 5000,
    },
  ],

  taxRate: 18,
  discount: 5000,
};

// ========================
// Colors
// ========================

const primaryColor = "#2563EB";
const darkColor = "#111827";
const grayColor = "#6B7280";
const lightGray = "#E5E7EB";
const white = "#FFFFFF";

// ========================
// Header
// ========================

doc
  .fillColor(primaryColor)
  .font("Helvetica-Bold")
  .fontSize(26)
  .text("INVOICE");

doc
  .fillColor(darkColor)
  .font("Helvetica-Bold")
  .fontSize(16)
  .text(invoice.company.name);

doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor(grayColor)
  .text(invoice.company.address)
  .text(invoice.company.email)
  .text(invoice.company.phone);

doc.moveDown(1);

// Invoice information

doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor(darkColor)
  .text(`Invoice #: ${invoice.invoiceNumber}`);

doc
  .font("Helvetica")
  .fontSize(10)
  .text(`Date: ${invoice.date}`)
  .text(`Due Date: ${invoice.dueDate}`);

doc.moveDown();

// ========================
// Customer
// ========================

drawLine();

doc
  .font("Helvetica-Bold")
  .fontSize(11)
  .fillColor(primaryColor)
  .text("BILL TO");

doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor(darkColor)
  .text(invoice.customer.name);

doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor(grayColor)
  .text(invoice.customer.address)
  .text(invoice.customer.email);

doc.moveDown(1);

// ========================
// Calculate totals
// ========================

let subtotal = 0;

invoice.items.forEach((item) => {
  item.total = item.quantity * item.price;
  subtotal += item.total;
});

const taxableAmount = subtotal - invoice.discount;
const tax = taxableAmount * (invoice.taxRate / 100);
const total = taxableAmount + tax;

// ========================
// Table Header
// ========================

const tableTop = doc.y;

const descriptionX = 50;
const quantityX = 350;
const priceX = 420;
const totalX = 500;

doc
  .rect(50, tableTop, 495, 25)
  .fill(primaryColor);

doc
  .fillColor(white)
  .font("Helvetica-Bold")
  .fontSize(9)
  .text("DESCRIPTION", descriptionX + 8, tableTop + 8);

doc.text("QTY", quantityX, tableTop + 8);
doc.text("PRICE", priceX, tableTop + 8);
doc.text("TOTAL", totalX, tableTop + 8);

// ========================
// Table Rows
// ========================

let rowY = tableTop + 25;

invoice.items.forEach((item, index) => {
  if (index % 2 === 0) {
    doc
      .rect(50, rowY, 495, 30)
      .fill("#F9FAFB");
  }

  doc
    .fillColor(darkColor)
    .font("Helvetica")
    .fontSize(9)
    .text(item.description, descriptionX + 8, rowY + 10);

  doc.text(item.quantity.toString(), quantityX, rowY + 10);

  doc.text(
    formatCurrency(item.price),
    priceX,
    rowY + 10
  );

  doc.text(
    formatCurrency(item.total),
    totalX,
    rowY + 10
  );

  rowY += 30;
});

// ========================
// Summary
// ========================

doc.moveDown(2);

const summaryX = 350;
const valueX = 470;

doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor(grayColor)
  .text("Subtotal", summaryX, doc.y);

doc
  .fillColor(darkColor)
  .text(formatCurrency(subtotal), valueX, doc.y - 10);

doc.moveDown(0.5);

doc
  .fillColor(grayColor)
  .text("Discount", summaryX, doc.y);

doc
  .fillColor(darkColor)
  .text(
    `- ${formatCurrency(invoice.discount)}`,
    valueX,
    doc.y - 10
  );

doc.moveDown(0.5);

doc
  .fillColor(grayColor)
  .text(`Tax (${invoice.taxRate}%)`, summaryX, doc.y);

doc
  .fillColor(darkColor)
  .text(formatCurrency(tax), valueX, doc.y - 10);

doc.moveDown(0.8);

drawLine();

// Total box

doc
  .rect(345, doc.y, 200, 40)
  .fill(primaryColor);

doc
  .fillColor(white)
  .font("Helvetica-Bold")
  .fontSize(12)
  .text("TOTAL", 360, doc.y + 13);

doc.text(
  formatCurrency(total),
  valueX,
  doc.y - 12
);

// ========================
// Payment Information
// ========================

doc.moveDown(3);

doc
  .fillColor(primaryColor)
  .font("Helvetica-Bold")
  .fontSize(11)
  .text("PAYMENT INFORMATION");

doc.moveDown(0.3);

doc
  .fillColor(darkColor)
  .font("Helvetica")
  .fontSize(9)
  .text("Bank: Example Bank")
  .text("Account Name: Harsha Technologies")
  .text("Account Number: 1234567890")
  .text("IFSC: EXAMPLE0001234");

// ========================
// Footer
// ========================

doc
  .fontSize(9)
  .fillColor(grayColor)
  .text(
    "Thank you for your business!",
    50,
    750,
    {
      align: "center",
      width: 495,
    }
  );

// Finish PDF
doc.end();

// ========================
// Helper Functions
// ========================

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function drawLine() {
  doc
    .strokeColor(lightGray)
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke();

  doc.moveDown(0.5);
}
