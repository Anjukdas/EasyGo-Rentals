import "../css/Login.css";

function Login() {
  return (
    <div className="login-container">
      <form className="login-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>

        <p className="login-footer">
          Don’t have an account? <span>Register</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
