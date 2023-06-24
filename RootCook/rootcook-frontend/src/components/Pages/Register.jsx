import React, { useState } from "react";
import "./Login.css";
import swal from "sweetalert";

export const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: name,
      email: email,
      password: password,
      password1: password1,
    };

    // Make a POST request to the /register endpoint
    fetch("http://127.0.0.1:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error while registrating:", data.error);
          swal("info", `Error while registrating: ${data.error}`, "info");
        } else {
          console.log("Registration successful:", data);
          props.onFormSwitch("login");
          swal("info", "You have successfully registerd", "success");
          setTimeout(() => {
            window.location = "http://127.0.0.1:3000/login";
          }, 2000);
        }
        // Optionally, you can redirect to a different page after successful registration
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        swal("error", error.message, "error");
        // Handle error condition, display error message, etc.
      });
  };

  return (
    <>
      <h1 id="home-title">Register</h1>
      <div className="auth-form-container1">
        <div className="auth-form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Username</label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              placeholder="Username"
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
            <label htmlFor="password1">Confirm Password</label>
            <br />
            <input
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              placeholder="***********"
              id="password1"
              name="password1"
            />
            <br />
            <button type="submit">Register</button>
          </form>

          <button onClick={() => props.onFormSwitch("login")} id="btn2">
            Already have an account? <p>Login here.</p>
          </button>
        </div>
      </div>
    </>
  );
};
