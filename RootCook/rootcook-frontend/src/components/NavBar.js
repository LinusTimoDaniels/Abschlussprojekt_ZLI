import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img src="https://wochenberichte.ictblj.ch/wochenberichte/api_02/danlin/images/Abschlussprojekt/Logo.png" className="nav-logo"></img>
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
