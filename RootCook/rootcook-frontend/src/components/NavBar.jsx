import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleLogout = () => {
    console.log(Cookies.get("jwt"));
    fetch("http://127.0.0.1:8080/logout")
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("login");
          // document.cookie = "jwt=Hello";
          // document.cookie =
          //   "jwt= Hello, 01 Jan 1971 00:00:00 GMT; expires = Thu, 01 Jan 1971 00:00:00 GMT; path=/; domain=127.0.0.1; secure; SameSite=None";
          // // Perform any additional actions after successful logout
          // console.log(document.cookie);
          Cookies.remove("jwt");
          console.log("User logged out successfully");
          swal("success", "User logged out successfully", "success");
          setTimeout(() => {
            window.location = "/";
          }, 1000);
        } else {
          throw new Error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        swal("error", "Logout failed", "error");
      });
  };

  const handleRefreshToken = () => {
    // Get the JWT cookie value
    const jwtCookie = Cookies.get("jwt");

    if (!jwtCookie) {
      console.error("JWT cookie not found");
      return;
    }

    // Send the fetch request with the JWT value as a query parameter
    fetch(`http://127.0.0.1:8080/refresh?jwt=${jwtCookie}`)
      .then((response) => {
        if (response.ok) {
          // Parse the JSON response
          return response.json();
        } else {
          throw new Error("Token refresh failed");
        }
      })
      .then((data) => {
        // Check if the accessToken property exists in the response
        if (data.accessToken) {
          // Store the access token in localStorage
          localStorage.setItem("login", JSON.stringify(data.accessToken));
          console.log("Access token refreshed successfully");
        } else {
          console.log("No access token received");
        }
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
      });
  };

  useEffect(() => {
    // Call handleRefreshToken immediately

    // Set up interval to call handleRefreshToken every 5 minutes
    const intervalId = setInterval(handleRefreshToken, 60 * 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img
              src="https://wochenberichte.ictblj.ch/wochenberichte/api_02/danlin/images/Abschlussprojekt/Logo.png"
              className="nav-logo"
            ></img>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/myrecipes"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                My Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/nutritionplan"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Nutrition Plan
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/bookmarks"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Bookmarks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <button id="logout-btn" onClick={() => handleLogout()}>
                Logout
              </button>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
