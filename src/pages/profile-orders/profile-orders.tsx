import { FC, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import styles from "./profile-orders.module.css";
import { useSelector, useDispatch } from "../../hooks/typedHooks";
import OrderCard from "../../components/order-card/order-card";
import {
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_STOP,
} from "../../services/constants/index";
import { routes, wsUrl } from "../../utils/constants";
import { TOrder } from "../../utils/types";

const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orders = useSelector((store) => store.userOrders.orders);

  const reversedOrdersArr = orders.slice().reverse();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    dispatch({
      type: USER_ORDERS_WS_CONNECTION_START,
      payload: `${wsUrl.userOrders}?token=${token !== null &&
        token.split("Bearer ")[1]
      }`,
    });

    return () => {
      dispatch({ type: USER_ORDERS_WS_CONNECTION_STOP });
    };
  }, []);

  return (
    <>
      {location.pathname === routes.profile.orders && (
        <ul className={`${styles.list} custom-scroll`}>
          {orders.length > 0 &&
            reversedOrdersArr.map((order: TOrder) => <OrderCard key={order._id} order={order} />)}
        </ul>
      )}
      <Outlet />
    </>
  );
};

export default ProfileOrders;
