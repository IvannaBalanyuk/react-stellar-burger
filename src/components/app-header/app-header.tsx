import React, { FC } from "react";
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

const AppHeader: FC = React.memo(() => {

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.content}>
        <NavPanel>
          <li className="pt-4 pr-5 pb-4 pl-5">
            <NavLink
              to={routes.home}
              className={styles.link}
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
              className={styles.link}
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
        <div className={styles.wrapper}>
          <Logo />
        </div>
        <NavPanel>
          <li className="pt-4 pr-5 pb-4 pl-5">
              <NavLink
                to={routes.profile.index}
                className={styles.link}
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
