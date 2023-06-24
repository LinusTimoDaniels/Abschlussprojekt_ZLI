import React, { useState } from "react";
import Cookies from "js-cookie";
import "./Login.css";
import swal from "sweetalert";

export const Login = ({ onFormSwitch, user, setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
      username: name,
    };

    // Make a POST request to the /login endpoint
    fetch("http://127.0.0.1:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error logging in:", data.error);
          swal("info", `Error logging in: ${data.error}`, "info");
        } else {
          console.log("Login successful:", data);
          swal("info", "You have successfully logged in", "success");
          console.log(data.accessToken);
          console.log("local", localStorage.getItem("login"));
          localStorage.setItem("login", JSON.stringify(data.accessToken));
          const userName = loginData.username;
          setUser(userName);
          Cookies.set("jwt", data.refreshToken);
          setTimeout(() => {
            window.location = "http://127.0.0.1:3000/";
          }, 2000);
        }

        // Optionally, you can perform some action after successful login
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        swal("error", error, "error");
        // Handle error condition, display error message, etc.
      });
  };

  return (
    <>
      <h1 id="home-title">Login</h1>
      <div className="auth-form-container1">
        <div className="auth-form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Username</label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="username"
              id="name"
              name="name"
            />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              id="email"
              name="email"
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***********"
              id="password"
              name="password"
            />
            <br />
            <button type="submit">Log In</button>
          </form>

          <button onClick={() => onFormSwitch("register")} id="btn2">
            Don't have an account yet? <p>Register here.</p>
          </button>
        </div>
      </div>
    </>
  );
};
