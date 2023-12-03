import { FC } from "react";
import { useSelector, shallowEqual } from "react-redux";
import styles from "./order-statistics.module.css";
import { TOrder } from "../../utils/types";

const OrderStatistics: FC = () => {
  const { orders, total, totalToday } = useSelector(
    (store) => ({
      orders: store.feedOrders.orders,
      total: store.feedOrders.total,
      totalToday: store.feedOrders.totalToday,
    }),
    shallowEqual
  );

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <div className={styles.status}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <ul className={`${styles.list} custom-scroll`}>
            {orders.map((order: TOrder) => {
              if (order.status === "done") {
                return (
                  <li
                    className="text text_type_digits-default text_color_success"
                    key={order._id}
                  >
                    {order.number}
                  </li>
                );
              }
              return <></>;
            })}
          </ul>
        </div>
        <div className={styles.status}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <div className={styles.numbers}>
            {orders.map((order: TOrder) => {
              if (order.status !== "done") {
                return (
                  <p className="text text_type_digits-default" key={order._id}>
                    {order.number}
                  </p>
                );
              }
              return <></>;
            })}
          </div>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${styles.shadow} text text_type_digits-large`}>
          {total}
        </p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${styles.shadow} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </div>
  );
};

export default OrderStatistics;
