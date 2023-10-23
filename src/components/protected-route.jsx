import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../utils/constants";

const Protected = ({ onlyUnAuth = false, component }) => {
  const user = useSelector((store) => store.auth.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: routes.home } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    const from = location.pathname === routes.order ? routes.home : location.pathname;
    return <Navigate to={routes.login} state={{ from: from }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
