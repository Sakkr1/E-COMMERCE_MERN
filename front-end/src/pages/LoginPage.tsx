import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="page">
      <div className="card">
 
        <div className="header">
          <span className="brand">TechStore</span>
          <h1 className="title">Welcome Back</h1>
          <div className="divider" />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
          />
        </div>
 
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <span className="forgot">Forgot password?</span>
        </div>

        <button className="btn">
          Sign In
        </button>
 
        <p className="footer">
          Don't have an account?{" "}
          <Link to={"/register"} style={{textDecoration: "none"}}>
            <span className="link">Register</span>
          </Link>
        </p>
      </div>
 
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
        .page {
          min-height: 100vh;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
 
        .card {
          background-color: #111;
          border: 1px solid #222;
          border-radius: 16px;
          padding: 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }
 
        .header {
          text-align: center;
          margin-bottom: 28px;
        }
 
        .brand {
          color: #00bcd4;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 6px;
        }
 
        .title {
          color: #fff;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
 
        .divider {
          margin: 12px auto 0;
          height: 3px;
          width: 48px;
          background-color: #00bcd4;
          border-radius: 2px;
        }
 
        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }
 
        label {
          color: #888;
          font-size: 0.85rem;
          font-weight: 500;
        }
 
        input {
          background-color: #1a1a1a;
          border: 1px solid #333;
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
          padding: 12px 14px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
 
        input::placeholder { color: #444; }
        input:hover { border-color: #00bcd4; }
        input:focus {
          border-color: #00bcd4;
          box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.15);
        }
 
        .forgot {
          color: #00bcd4;
          font-size: 0.8rem;
          cursor: pointer;
          align-self: flex-end;
          margin-top: 2px;
        }
 
        .btn {
          width: 100%;
          background-color: #00bcd4;
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 14px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 8px;
        }
 
        .btn:hover { background-color: #0097a7; }
 
        .footer {
          color: #555;
          font-size: 0.875rem;
          text-align: center;
          margin-top: 24px;
        }
 
        .link {
          color: #00bcd4;
          font-weight: 700;
          cursor: pointer;
        }
 
        @media (max-width: 480px) {
          .card { padding: 24px; }
        }
      `}</style>
    </div>
  );
};
 
export default LoginPage;