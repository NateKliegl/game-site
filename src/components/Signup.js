import React, { useState } from "react";
import useAxios from "../hooks/useAxios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const { json } = useAxios("/users/signup", "post", userObj);
  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        {error &&
          username.length < 4 &&
          "Username must be more than 4 characters"}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        {error &&
          password.length < 8 &&
          "Password must be more than 8 characters"}
      </div>
      <button
        onClick={() => {
          if (username.length < 4 || password.length < 8) {
            setError(true);
            return;
          }
          setUserObj({ username, password });
        }}
      >
        Signup
      </button>
      <div>{json && json.error}</div>
      <div>{json && json.data}</div>
    </div>
  );
}

export default Signup;
