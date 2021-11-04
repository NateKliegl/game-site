import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "../shared/GameContext";
import useAxios from "../hooks/useAxios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(GameContext);
  const [userObj, setUserObj] = useState(null);
  const { json } = useAxios("/users/login", "post", userObj);

  useEffect(() => {
    if (json && json.success) {
      setUser(json.data);
    }
  }, [setUser, json]);

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
          id="password"
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        {error &&
          password.length < 8 &&
          "Username must be more than 8 characters"}
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
        Login
      </button>
      <div>{json && json.error}</div>
    </div>
  );
}
