import React, { useContext } from "react";
import { GameContext } from "../shared/GameContext";
import { NavLink } from "react-router-dom";

function Menu() {
  const { user, clearState } = useContext(GameContext);

  return (
    <nav>
      {!user.username && (
        <>
          <NavLink to="/signup" activeClassName="active">
            Signup
          </NavLink>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        </>
      )}
      {user.username && (
        <>
          <NavLink to="/home" activeClassName="active">
            Home Page
          </NavLink>
          <NavLink to="/snake" activeClassName="active">
            Snake Game
          </NavLink>
          <button onClick={clearState}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Menu;
