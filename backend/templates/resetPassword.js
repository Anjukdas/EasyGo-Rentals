export const resetPasswordEmail = (name, resetUrl) => {
  return `
    <h2>Hello ${name} 👋</h2>

    <p>
      We received a request to reset your EasyGo Rentals password.
    </p>

    <p>
      Click the button below to create a new password:
    </p>

    <a href="${resetUrl}">
      Reset Password
    </a>

    <p>
      This link will expire in 15 minutes.
    </p>

    <br/>

    <p>
      If you did not request this, please ignore this email.
    </p>

    <p>
      EasyGo Rentals Team 🚗
    </p>
  `;
};