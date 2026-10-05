const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument({
  size: "A4",
  margin: 50,
});

doc.pipe(fs.createWriteStream("harsha-resume.pdf"));

// =========================
// COLORS
// =========================
const primaryColor = "#1F4E79";
const darkColor = "#222222";
const grayColor = "#666666";
const lightGray = "#E5E7EB";

// =========================
// HEADER
// =========================
doc
  .fillColor(primaryColor)
  .fontSize(28)
  .font("Helvetica-Bold")
  .text("HARSHA");

doc
  .fillColor(darkColor)
  .fontSize(13)
  .font("Helvetica")
  .text("MERN Stack Developer");

doc.moveDown(0.5);

doc
  .fillColor(grayColor)
  .fontSize(10)
  .text("Age: 22  |  Software Developer  |  India");

doc.text("Email: harsha@example.com  |  Phone: +91 98765 43210");

doc.text("GitHub: github.com/harsha  |  LinkedIn: linkedin.com/in/harsha");

doc.moveDown();

drawLine();

// =========================
// PROFILE
// =========================
sectionTitle("PROFILE");

doc
  .fillColor(darkColor)
  .fontSize(10.5)
  .font("Helvetica")
  .text(
    "Passionate Software Developer specializing in the MERN stack. " +
      "Experienced in building responsive web applications using MongoDB, " +
      "Express.js, React.js, and Node.js. Strong understanding of REST APIs, " +
      "authentication, database design, and modern frontend development."
  );

doc.moveDown();

// =========================
// SKILLS
// =========================
sectionTitle("TECHNICAL SKILLS");

skill("Frontend", "HTML5, CSS3, JavaScript, React.js, Redux, Tailwind CSS");

skill("Backend", "Node.js, Express.js, REST APIs, JWT Authentication");

skill("Database", "MongoDB, Mongoose");

skill("Tools", "Git, GitHub, Postman, VS Code, npm");

skill("Other", "Responsive Design, API Integration, Authentication, CRUD");

// =========================
// EXPERIENCE
// =========================
sectionTitle("EXPERIENCE");

doc
  .font("Helvetica-Bold")
  .fontSize(12)
  .fillColor(darkColor)
  .text("Software Developer");

doc
  .font("Helvetica-Oblique")
  .fontSize(10)
  .fillColor(grayColor)
  .text("Sample Technology Company | 2024 - Present");

doc.moveDown(0.3);

bullet(
  "Developed responsive web applications using React.js and modern JavaScript."
);

bullet(
  "Built REST APIs using Node.js and Express.js for frontend integration."
);

bullet(
  "Designed MongoDB schemas using Mongoose and implemented CRUD operations."
);

bullet(
  "Implemented JWT-based authentication and role-based authorization."
);

doc.moveDown();

// =========================
// PROJECTS
// =========================
sectionTitle("PROJECTS");

project(
  "1. E-Commerce MERN Application",
  "Full-stack e-commerce platform built using MongoDB, Express.js, React.js, and Node.js."
);

bullet("User registration and JWT authentication.");
bullet("Product listing, search, filtering, and categories.");
bullet("Shopping cart and order management.");
bullet("Admin dashboard for products and orders.");

doc.moveDown(0.7);

project(
  "2. Task Management System",
  "A collaborative task management application for creating, assigning, and tracking tasks."
);

bullet("React-based dashboard with responsive UI.");
bullet("Node.js and Express REST APIs.");
bullet("MongoDB database for users, tasks, and projects.");
bullet("JWT authentication and protected routes.");

doc.moveDown(0.7);

project(
  "3. Developer Portfolio",
  "Personal portfolio website showcasing projects, skills, and professional experience."
);

bullet("Built with React.js and Tailwind CSS.");
bullet("Integrated contact form with backend API.");
bullet("Responsive design for desktop and mobile devices.");
bullet("Project showcase with GitHub links.");

// =========================
// EDUCATION
// =========================
sectionTitle("EDUCATION");

doc
  .font("Helvetica-Bold")
  .fontSize(12)
  .fillColor(darkColor)
  .text("Bachelor's Degree in Computer Science");

doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor(grayColor)
  .text("Sample University | 2021 - 2025");

doc.moveDown();

// =========================
// LANGUAGES
// =========================
sectionTitle("LANGUAGES");

doc
  .font("Helvetica")
  .fontSize(10.5)
  .fillColor(darkColor)
  .text("English  |  Telugu  |  Hindi");

// =========================
// FOOTER
// =========================
doc.moveDown(2);

drawLine();

doc
  .fontSize(8)
  .fillColor(grayColor)
  .text(
    "References available upon request.",
    { align: "center" }
  );

// Finish PDF
doc.end();

// =========================
// HELPER FUNCTIONS
// =========================

function sectionTitle(title) {
  doc.moveDown(0.6);

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor(primaryColor)
    .text(title);

  doc.moveDown(0.25);

  drawLine();
}

function drawLine() {
  doc
    .strokeColor(lightGray)
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke();

  doc.moveDown(0.4);
}

function skill(title, value) {
  doc
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .fillColor(darkColor)
    .text(`${title}: `, {
      continued: true,
    });

  doc
    .font("Helvetica")
    .fillColor(grayColor)
    .text(value);
}

function bullet(text) {
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(darkColor)
    .text(`• ${text}`, {
      indent: 10,
      paragraphGap: 3,
    });
}

function project(title, description) {
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(darkColor)
    .text(title);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(grayColor)
    .text(description);

  doc.moveDown(0.3);
}
