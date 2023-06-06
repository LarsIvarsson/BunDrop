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

    // TODO: add length checks

    if (password === verify) {
      await fetch("http://localhost:7000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      }).catch((err) => console.log(err));
    }
    setUsername("");
    setPassword("");
    setVerify("");
  }

  return (
    <div className="view-frame white-bg text-center">
      <h1>Register</h1>

      <form onSubmit={handleSubmit} className="block-container">
        <label htmlFor="username-input">Användarnamn: </label>
        <input
          onChange={handleUserameChange}
          className="input-field"
          id="username-input"
          type="text"
          placeholder="Användarnamn"
          value={username}
        />
        <label htmlFor="password-input">Lösenord: </label>
        <input
          onChange={handlePasswordChange}
          className="input-field"
          id="password-input"
          type="password"
          placeholder="Lösenord"
          value={password}
        />
        <label htmlFor="verify-input">Upprepa lösenord: </label>
        <input
          onChange={handleVerifyChange}
          className="input-field"
          id="verify-input"
          type="password"
          placeholder="Upprepa lösenord"
          value={verify}
        />
        <div>
          <button type="submit" className="green-btn">
            Registrera konto
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
