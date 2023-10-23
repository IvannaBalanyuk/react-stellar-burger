import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavPanel from "./components/nav-panel/nav-panel";
import { routes } from "../../utils/constants";

const AppHeader = React.memo(() => {
  const { header, content, wrapper, link } = styles;

  return (
    <header className={`${header} pt-4 pb-4`}>
      <div className={content}>
        <NavPanel>
          <li className="pt-4 pr-5 pb-4 pl-5">
            <NavLink
              to={routes.home}
              className={link}
              end
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <span className={isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>Конструктор</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="pt-4 pr-5 pb-4 pl-5">
            <NavLink
              to={routes.feed}
              className={link}
              end
            >
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <span className={isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>Лента заказов</span>
                </>
              )}
            </NavLink>
          </li>
        </NavPanel>
        <div className={wrapper}>
          <Logo />
        </div>
        <NavPanel>
          <li className="pt-4 pr-5 pb-4 pl-5">
              <NavLink
                to={routes.profile.index}
                className={link}
              >
                {({ isActive }) => (
                  <>
                    <ProfileIcon type={isActive ? "primary" : "secondary"} />
                    <span className={isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>Личный кабинет</span>
                  </>
                )}
              </NavLink>
            </li>
        </NavPanel>
      </div>
    </header>
  );
});

export default AppHeader;
