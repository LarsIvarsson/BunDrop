import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  function handleSubmit(e) {
    e.preventDefault();

    users.forEach((u) => {
      if (u.username === username && u.password === password) {
        localStorage.setItem("signedInUser", u.id);
        setUsername("");
        setPassword("");
        props.changeSignedIn();
        navigate(`/`);
      } else {
        setError("Username or password not correct");
      }
    });
  }

  return (
    <div className="view-frame white-bg text-center">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="block-container">
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

        <div>
          <p className="text-warning">{error}</p>
          <button type="submit" className="green-btn">
            Logga in
          </button>
          <Link to="/register">
            <button className="green-btn">Registrera</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
