import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar({ signedIn, changeSignedIn }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(signedIn);
  const navbarRef = useRef(null);

  const handleClickOutside = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setIsNavExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsSignedIn(signedIn);
  }, [signedIn]);

  function signOut() {
    localStorage.removeItem("signedInUser");
    localStorage.removeItem("shoppingCart");
    changeSignedIn();
  }

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
          ref={navbarRef}
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
            {isSignedIn ? (
              <Link
                onClick={() => {
                  setIsNavExpanded(!isNavExpanded);
                }}
                to="/din-sida"
              >
                <li>Din sida</li>
              </Link>
            ) : null}
            {isSignedIn ? (
              <Link onClick={signOut}>
                <li>Logga ut</li>
              </Link>
            ) : (
              <Link
                onClick={() => {
                  setIsNavExpanded(!isNavExpanded);
                }}
                to="/login"
              >
                <li>Logga in</li>
              </Link>
            )}
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
