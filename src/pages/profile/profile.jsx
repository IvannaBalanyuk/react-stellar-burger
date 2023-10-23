import { useDispatch } from "react-redux";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import styles from "./profile.module.css";
import { logout } from "../../services/actions/auth";
import { routes } from "../../utils/constants";

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const onLogout= (e) => {
    e.preventDefault();
    dispatch(logout());
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
