import React, {useContext} from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "./../../contexts/auth.context";

const ProtectedRoute = (props) => {
  const { user } = useContext(AuthContext);
  // const { user, type="private" } = props;
  // if (type === "guest" && user) return <Redirect to="/home" />;
  // else
  if (/*type === "private" &&*/ !user) return <Redirect to="/login" />;

  return <Route {...props} />;
};

export default ProtectedRoute;
