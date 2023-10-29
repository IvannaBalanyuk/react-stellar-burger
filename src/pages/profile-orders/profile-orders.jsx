import { useEffect } from "react";
import styles from "./profile-orders.module.css";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../components/order-card/order-card";
import { USER_ORDERS_WS_CONNECTION_START } from "../../services/actions/user-orders";
import { routes, wsUrl } from "../../utils/constants";

export default function ProfileOrders() {
  const orders = useSelector((store) => store.userOrders.orders);
  console.log(orders);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({
      type: "USER_ORDERS_WS_CONNECTION_START",
      payload: `wss://norma.nomoreparties.space/orders?token=${
        localStorage.getItem("accessToken").split("Bearer ")[1]
      }`,
    });
  }, []);

  return (
    <>
      {location.pathname === routes.profile.orders && (
        <ul className={`${styles.orders} custom-scroll`}>
          {orders.length > 0 &&
            orders.map((order) => <OrderCard key={order._id} order={order} />)}
        </ul>
      )}
      <Outlet />
    </>
  );
}
