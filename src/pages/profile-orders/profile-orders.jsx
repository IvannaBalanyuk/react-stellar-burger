import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import styles from "./profile-orders.module.css";
import OrderCard from "../../components/order-card/order-card";
import { USER_ORDERS_WS_CONNECTION_START } from "../../services/actions/user-orders";
import { routes, wsUrl } from "../../utils/constants";

const ProfileOrders = () => {
  const orders = useSelector((store) => store.userOrders.orders);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({
      type: USER_ORDERS_WS_CONNECTION_START,
      payload: `${wsUrl.userOrders}?token=${
        localStorage.getItem("accessToken").split("Bearer ")[1]
      }`,
    });
  }, []);

  return (
    <>
      {location.pathname === routes.profile.orders && (
        <ul className={`${styles.list} custom-scroll`}>
          {orders.length > 0 &&
            orders.map((order) => <OrderCard key={order._id} order={order} />)}
        </ul>
      )}
      <Outlet />
    </>
  );
}

export default ProfileOrders;
