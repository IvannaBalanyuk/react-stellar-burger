import { FC, MouseEventHandler } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import styles from "./profile.module.css";
import { useDispatch } from "../../hooks/typedHooks";
import { logoutThunk} from "../../services/actions/auth";
import { routes } from "../../utils/constants";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const onLogout: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    dispatch(logoutThunk());
  }

  return (
    <main className={styles.content}>
      <section className={styles.section}>
        {(location === routes.profile.index || location === routes.profile.orders) && (
          <div className={styles.sidebar}>
            <nav>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <NavLink to={routes.profile.index} className={styles.link} end>
                    {({ isActive }) => (
                      <span
                        className={
                          isActive
                            ? "text text_type_main-medium"
                            : "text text_type_main-medium text_color_inactive"
                        }
                      >
                        Профиль
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className={styles.item}>
                  <NavLink to={routes.profile.orders} className={styles.link}>
                    {({ isActive }) => (
                      <span
                        className={
                          isActive
                            ? "text text_type_main-medium"
                            : "text text_type_main-medium text_color_inactive"
                        }
                      >
                        История заказов
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className={styles.item}>
                  <NavLink to={routes.home} className={styles.link} onClick={onLogout}>
                    {({ isActive }) => (
                      <span
                        className={
                          isActive
                            ? "text text_type_main-medium"
                            : "text text_type_main-medium text_color_inactive"
                        }
                      >
                        Выход
                      </span>
                    )}
                  </NavLink>
                </li>
              </ul>
            </nav>
            <p className="text text_type_main-default text_color_inactive mt-20">
              {location === routes.profile.index
                ? "В этом разделе вы можете изменить свои персональные данные"
                : location === routes.profile.orders
                ? "В этом разделе вы можете просмотреть свою историю заказов"
                : ""}
            </p>
          </div>
        )}
        <Outlet />
      </section>
    </main>
  );
};

export default Profile;
