import React from "react";

function Register() {
  return (
    <div className="view-frame white-bg text-center">
      <h1>Register</h1>
      <div className="block-container">
        <label htmlFor="username-input">Användarnamn: </label>
        <input id="username-input" type="text" />
        <label htmlFor="password-input">Lösenord: </label>
        <input id="password-input" type="password" />
        <label htmlFor="verify-input">Upprepa lösenord: </label>
        <input id="verify-input" type="password" />
        <button className="order-btn">Registrera konto</button>
      </div>
    </div>
  );
}

export default Register;
