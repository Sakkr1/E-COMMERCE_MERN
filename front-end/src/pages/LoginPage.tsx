import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import BASE_URL from "../constants/BASE_URL";
import useAuth from "../context/Auth/AuthContext";

const LoginPage = () => {
  const [err, setErr] = useState<string>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();

  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return;
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response) return;
    if (!response.ok) {
      setErr(result);
      return;
    }

    login(email, result);
    navigate("/");
  };
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
            ref={emailRef}
            placeholder="john@example.com"
            autoComplete="email"
          />
        </div>

        <div
          style={{ position: "relative", marginBottom: "20px" }}
          className="field"
        >
          <label htmlFor="pasword">Password</label>
          <input
            id="password"
            name="password"
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: "12px",
              bottom: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "#666",
            }}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.39 1 12a10.94 10.94 0 0 1 2.06-3.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c5 0 9.27 3.61 11 8a10.95 10.95 0 0 1-1.38 2.62" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {err && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#f87171",
              fontSize: "0.85rem",
              marginBottom: "20px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87171"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {err}
          </div>
        )}

        <button onClick={handleSubmit} className="btn">
          Sign In
        </button>

        <p className="footer">
          Don't have an account?{" "}
          <Link to={"/register"} style={{ textDecoration: "none" }}>
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
