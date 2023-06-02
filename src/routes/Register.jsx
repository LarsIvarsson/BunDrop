import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");

  function handleUserameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleVerifyChange(e) {
    setVerify(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password === verify) {
      await fetch("http://localhost:7000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
    }
    setUsername("");
    setPassword("");
    setVerify("");
  }

  return (
    <div className="view-frame white-bg text-center">
      <h1>Register</h1>
      <div className="block-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username-input">Användarnamn: </label>
          <input
            onChange={handleUserameChange}
            id="username-input"
            type="text"
            placeholder="Användarnamn"
            value={username}
          />
          <label htmlFor="password-input">Lösenord: </label>
          <input
            onChange={handlePasswordChange}
            id="password-input"
            type="password"
            placeholder="Lösenord"
            value={password}
          />
          <label htmlFor="verify-input">Upprepa lösenord: </label>
          <input
            onChange={handleVerifyChange}
            id="verify-input"
            type="password"
            placeholder="Upprepa lösenord"
            value={verify}
          />
          <button type="submit" className="order-btn">
            Registrera konto
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
