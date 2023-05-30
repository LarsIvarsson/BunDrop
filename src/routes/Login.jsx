import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="view-frame white-bg text-center">
      <h1>Login</h1>
      <div className="block-container">
        <label htmlFor="username-input">Användarnamn: </label>
        <input id="username-input" type="text" />
        <label htmlFor="password-input">Lösenord: </label>
        <input id="password-input" type="password" />
        <button className="order-btn">Logga in</button>
        <Link to="/register">
          <button className="order-btn">Registrera</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
