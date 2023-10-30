import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import styles from "./feed.module.css";
import OrderCard from "../../components/order-card/order-card";
import OrderStatistics from "../../components/order-statistics/order-statistics";
import { FEED_WS_CONNECTION_START } from "../../services/actions/feed-orders";
import { routes, wsUrl } from "../../utils/constants";

const Feed = () => {
  const orders = useSelector((store) => store.feedOrders.orders);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({
      type: FEED_WS_CONNECTION_START,
      payload: wsUrl.feedOrders,
    });
  }, []);

  return (
    <main className={styles.content}>
      {location.pathname === routes.feed && (
        <section className={`${styles.section} pl-5 pt-10 pb-10`}>
          <h2 className="text text_type_main-large">Лента заказов</h2>
          <div className={styles.container}>
            <ul className={`${styles.list} custom-scroll`}>
              {orders.length > 0 &&
                orders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
            </ul>
            <OrderStatistics />
          </div>
        </section>
      )}
      <Outlet />
    </main>
  );
};

export default Feed;
