import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnAuth = false, component }) => {
  const user = useSelector((store) => store.auth.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } =
      location.state.from !== "/profile"
        ? location.state || { from: { pathname: "/" } }
        : { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    const from = location.pathname === "/order" ? "/" : location.pathname;
    return <Navigate to="/login" state={{ from: from }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
