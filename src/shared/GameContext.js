import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const GameContext = React.createContext(null);

export function GameProvider(props) {
  const [user, setUser] = useState({});
  const [score, setScore] = useState([]);

  useEffect(() => {
    async function getScores() {
      const { data } = await axios.get(`/score/user`);
      if (!data.success) return;
      setScore(data.data);
    }
    if (user.username) {
      getScores();
    }
  }, [user]);

  useEffect(() => {
    async function verify() {
      try {
        const { data } = await axios.get("/users/verify");
        if (!data.success) {
          setUser(data.data);
        }
      } catch (e) {}
    }
    verify();
  }, []);

  const addScore = useCallback(
    async (game) => {
      const { data } = await axios.post("/score/add", { ...game });

      setScore((curr) => {
        return [...curr, data.data];
      });
    },
    [setScore, user]
  );

  const clearState = useCallback(async () => {
    try {
      await axios.get("/users/logout");
      setUser({});
      setScore([]);
    } catch (e) {}
  }, [setScore, setUser]);
  return (
    <GameContext.Provider
      value={{
        user,
        score,
        addScore,
        clearState,
        setUser,
        setScore,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
