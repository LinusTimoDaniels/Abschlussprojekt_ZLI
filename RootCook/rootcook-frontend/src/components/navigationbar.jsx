import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img src="https://wochenberichte.ictblj.ch/wochenberichte/api_02/danlin/images/Abschlussprojekt/Logo.png" alt="Logo" className="nav-logo" />
            <i className="fas fa-code"></i>
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
                to="/Nutritonplan"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Nutriton Plan
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/MyRecipes"
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
                to="/Bookmarks"
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
                to="/Contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact
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
