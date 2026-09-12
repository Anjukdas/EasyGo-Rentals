// import nodemailer from "nodemailer";


// console.log("Mail User:", process.env.EMAIL_USER);
// console.log("Mail Pass:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// export default transporter;
import nodemailer from "nodemailer";

console.log("Mail User:", process.env.EMAIL_USER);
console.log(
  "Mail Pass:",
  process.env.EMAIL_PASS ? "Loaded" : "Missing"
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  // Force IPv4 - important for Render
  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  requireTLS: true,

  // Prevent very long waiting
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

export default transporter;