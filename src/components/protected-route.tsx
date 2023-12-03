import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../utils/constants";

type OnlyAuthProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
  children?: React.ReactNode;
};
type OnlyUnAuthProps = {
  component: JSX.Element;
};

const Protected: FC<OnlyAuthProps> = ({ onlyUnAuth = false, component }) => {
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
export const OnlyUnAuth: FC<OnlyUnAuthProps> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
