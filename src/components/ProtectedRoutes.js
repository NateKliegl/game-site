import React, { useContext, useMemo } from "react";
import { Redirect, Route } from "react-router-dom";
import { GameContext } from "../shared/GameContext";

function ProtectedRoutes({ children, path, armor }) {
  const { user } = useContext(GameContext);
  const redirectTo = useMemo(() => (armor ? "/login" : "/home"), [armor]);
  if ((user.username && armor) || (!user.username && !armor)) {
    return <Route path={path}>{children}</Route>;
  } else {
    return (
      <Route>
        <Redirect to={redirectTo}></Redirect>
      </Route>
    );
  }
}

export default ProtectedRoutes;
