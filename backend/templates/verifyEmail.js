export const verifyEmail = (name, verificationUrl) => {
  return `
    <h2>Hello ${name} 👋</h2>

    <p>Welcome to EasyGo Rentals 🚗</p>

    <p>
      Please verify your email address to activate your account.
    </p>

    <a href="${verificationUrl}">
      Verify Email
    </a>

    <p>
      This link will expire in 24 hours.
    </p>

    <br/>

    <p>
      EasyGo Rentals Team
    </p>
  `;
};