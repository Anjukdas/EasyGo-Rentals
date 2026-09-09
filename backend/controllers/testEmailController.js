import transporter from "../config/mail.js";

export const sendTestEmail = async (req, res) => {
    console.log("Email:", process.env.EMAIL_USER);
console.log("Password:", process.env.EMAIL_PASS? "Password Loaded" : "Password Missing");
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "EasyGo Rentals - Test Email",
      text: "Congratulations! Your Nodemailer setup is working successfully.",
    });

    res.status(200).json({
      success: true,
      message: "Test email sent successfully!",
    });
  } catch (error) {
    console.error("Email Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};