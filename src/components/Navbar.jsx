import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <div>
      <div className="dummy-navbar"></div>
      <div className="flex-container justify-between white-bg fixed navbar">
        <h1 className="logo">
          <Link to="/">BD</Link>
        </h1>

        <div
          className={
            isNavExpanded ? "flex-container expanded" : "flex-container"
          }
        >
          <ul className="nav-container">
            <Link
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
              to="/meny"
            >
              <li>Meny</li>
            </Link>
            <Link
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
              to="/varukorg"
            >
              <li>Varukorg</li>
            </Link>
            <Link
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
              to="/login"
            >
              <li>Logga in</li>
            </Link>
          </ul>
          <FontAwesomeIcon
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
            className="burger-menu"
            icon={faBars}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
