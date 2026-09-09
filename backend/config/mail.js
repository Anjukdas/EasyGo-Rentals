import nodemailer from "nodemailer";


console.log("Mail User:", process.env.EMAIL_USER);
console.log("Mail Pass:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default transporter;