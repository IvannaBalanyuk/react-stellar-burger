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

const AppHeader = React.memo(() => {
  const { header, content, wrapper, item } = styles;

  return (
    <header className={`${header} pt-4 pb-4`}>
      <div className={content}>
        <NavPanel>
          <li className="pt-4 pr-5 pb-4 pl-5">
            <NavLink
              to="/"
              className={`${item}`}
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
              to="/feed"
              className={`${item}`}
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
                to="/profile"
                className={`${item}`}
                end
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
