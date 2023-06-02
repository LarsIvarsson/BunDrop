import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="dummy-navbar"></div>
      <div className="flex-container justify-between white-bg fixed navbar">
        <Link to="/">
          <h1>BD</h1>
        </Link>
        <div className="flex-container">
          <Link to="/meny">
            <h4>Meny</h4>
          </Link>
          <Link to="/varukorg">
            <h4>Varukorg</h4>
          </Link>
          <Link to="/login">
            <h4>Logga in</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
