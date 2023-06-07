import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  function handleUserameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
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

        <div>
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
