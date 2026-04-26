import { useRef } from "react";
import BASE_URL from "../constants/BASE_URL";
import { Link } from "react-router-dom";
import { useState } from "react";

 
const RegisterPage = () => {
  const[err, setErr] = useState<string>();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async() => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    })

    if(!response.ok) {
        setErr("Something went wrong, please try again");
        return;
    }
    console.log(await response.json());
  }
 
 
  return (
    <div className="page">
      <div className="card">

        <div className="header">
          <span className="brand">TechStore</span>
          <h1 className="title">Register A New Account</h1>
          <div className="divider" />
        </div>
 
        <div className="row">
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              autoComplete="given-name"
              ref={firstNameRef}
            />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
              ref={lastNameRef}
            />
          </div>
        </div>
 
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            ref={emailRef}
          />
        </div>
 
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            ref={passwordRef}
          />
        </div>

        
        {err && <div style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            borderRadius: "8px",
            padding: "12px 16px",
            color: "#f87171",
            fontSize: "0.85rem",
            marginBottom: "20px",
        }}> {err} </div>}
        
 
        <button className="btn" onClick={handleSubmit}>
          Register
        </button>
 
        <p className="footer">
          Already have an account?{" "}
          <Link to={"/login"} style={{textDecoration: "none"}}>
            <span className="link">Log In</span>
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
          max-width: 460px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
 
        .header {
          text-align: center;
          margin-bottom: 32px;
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
 
        .row {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }
 
        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
          flex: 1;
        }
 
        .row .field {
          margin-bottom: 0;
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
          box-shadow: 0 0 0 2px rgba(0,188,212,0.15);
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
          .row { flex-direction: column; gap: 0; }
          .row .field { margin-bottom: 20px; }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;