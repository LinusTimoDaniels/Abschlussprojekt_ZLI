import React from "react";
import { useState } from "react";
import "./Login.css";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="auth-form-container1">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <br />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="example@email.com"
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="password">password</label>
          <br />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="***********"
            id="password"
            name="password"
          /> 
          <br />
          <button>Log In</button>
        </form>

        <button onClick={() => props.onFormSwitch("register")} id="btn2">
          Don't have an account yet? <p>Register here.</p>
        </button>
      </div>
    </div>
  );
};
