import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="view-frame white-bg text-center block-container">
      <h1>Login</h1>

      <label htmlFor="username-input">Användarnamn: </label>
      <input className="input-field" id="username-input" type="text" />

      <label htmlFor="password-input">Lösenord: </label>
      <input className="input-field" id="password-input" type="password" />

      <div>
        <button className="green-btn">Logga in</button>
        <Link to="/register">
          <button className="green-btn">Registrera</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
