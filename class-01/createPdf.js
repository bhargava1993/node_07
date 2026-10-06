const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("output.pdf"));

doc.fontSize(25).text("Hello World!");
doc.moveDown();
doc.fontSize(14).text("PDF generated with Node.js");

doc.end();
