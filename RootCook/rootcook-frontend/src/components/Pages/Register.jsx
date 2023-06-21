import React from "react";
import { useState } from "react";
import "./Login.css";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="auth-form-container1">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <br />
          <input
            type="text"
            value={name}
            name="name"
            id="name"
            placeholder="Username"
          />
          <br />
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
          <label htmlFor="password1">confirm password</label>
          <br />
          <input
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            type="password"
            placeholder="***********"
            id="password1"
            name="password1"
          />
          <br />
          <button>Register</button>
        </form>

        <button onClick={() => props.onFormSwitch("login")} id="btn2">
          Already have an account? <p>Login here.</p>
        </button>
      </div>
    </div>
  );
};
