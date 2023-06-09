import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const users = useFetch("http://localhost:7000/users", []);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleUserameChange(e) {
    setError("");
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setError("");
    setPassword(e.target.value);
  }

  function handleVerifyChange(e) {
    setError("");
    setVerify(e.target.value);
  }

  function validateInputs(e) {
    e.preventDefault();

    let isUsernameTaken = false;

    users.forEach((u) => {
      if (u.username === username) {
        setError("Användarnamn upptaget - var god välj ett annat");
        isUsernameTaken = true;
        return;
      }
    });

    if (isUsernameTaken) {
      return;
    }

    if (username.length < 4) {
      setError("Användarnamn för kort - måste vara minst 4 tecken");
      return;
    } else if (password.length < 4) {
      setError("Lösenord för kort - måste vara minst 4 tecken");
    } else if (password !== verify) {
      setError("Lösenorden stämmer inte överens");
    } else {
      handleSubmit();
    }
  }

  async function handleSubmit() {
    await fetch("http://localhost:7000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        orders: [],
        favorites: [],
      }),
    }).catch((err) => console.log(err));

    setUsername("");
    setPassword("");
    setVerify("");
    navigate("/");
  }

  return (
    <div className="view-frame white-bg text-center">
      <h1>Register</h1>

      <form onSubmit={validateInputs} className="block-container">
        <label htmlFor="username-input">Användarnamn: </label>
        <input
          onChange={handleUserameChange}
          className="input-field"
          id="username-input"
          type="text"
          placeholder="Användarnamn"
          value={username}
          required
        />
        <label htmlFor="password-input">Lösenord: </label>
        <input
          onChange={handlePasswordChange}
          className="input-field"
          id="password-input"
          type="password"
          placeholder="Lösenord"
          value={password}
          required
        />
        <label htmlFor="verify-input">Upprepa lösenord: </label>
        <input
          onChange={handleVerifyChange}
          className="input-field"
          id="verify-input"
          type="password"
          placeholder="Upprepa lösenord"
          value={verify}
          required
        />
        <div>
          <p className="text-warning">{error}</p>
          <button type="submit" className="green-btn">
            Registrera konto
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
