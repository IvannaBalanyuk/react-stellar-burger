import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./order-info.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getIngredientById,
  getTotalCountOfIngredient,
  isEmptyObj,
} from "../../utils/utils";
import { getOrderRequest } from "../../services/api";

const OrderInfo = () => {
  const ingredients = useSelector((store) => store.burgerIngredients.ingredients);
  const [order, setOrder] = useState({
    data: {},
    error: false,
  });
  const { number } = useParams();

  let orderIngredients;
  let orderPrice;

  if (!isEmptyObj(order.data)) {
    orderIngredients = order.data.ingredients.map((item) =>
      getIngredientById(ingredients, item)
    );
    orderPrice = orderIngredients.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  }

  useEffect(() => {
    getOrderRequest(number).then((res) => {
      setOrder({ ...order, data: res.orders[0] });
    });
  }, []);

  const dateFromServer = order.data.createdAt;

  return (
    <div className={styles.container}>
      <h2 className={`${styles.text} text text_type_digits-default`}>
        {`#${order.data.number}`}
      </h2>
      <div className={`${styles.title} mb-5`}>
        <h3 className="text text_type_main-medium">{order.data.name}</h3>
        <p className="text text_type_main-default text_color_success">
          {order.data.status === "done" ? "Выполнен" : "Готовится"}
        </p>
      </div>
      <div className={styles.composition}>
        <p className="text text_type_main-medium">Состав:</p>
        <ul className={`${styles.list} custom-scroll`}>
          {orderIngredients &&
            orderIngredients.map((item, index, array) => {
              const { count, indexes } = getTotalCountOfIngredient(
                item,
                array
              );
              if (count > 1 && index === indexes[0]) {
                return (
                  <li className={styles.item} key={index}>
                    <div
                      className={styles.image}
                      style={{ backgroundImage: `url(${item.image_mobile})` }}
                    ></div>
                    <p
                      className={`${styles.name} text text_type_main-default`}
                    >
                      {item.name}
                    </p>
                    <div className={styles.price}>
                      <p className="text text_type_digits-default">
                        {`${count}x${item.price}`}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                );
              }
              if (count > 1 && index !== indexes[0]) {
                return null;
              }
              return (
                <li className={styles.item} key={index}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${item.image_mobile})` }}
                  ></div>
                  <p className={`${styles.name} text text_type_main-default`}>
                    {item.name}
                  </p>
                  <div className={styles.price}>
                    <p className="text text_type_digits-default">
                      {`${count}x${item.price}`}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div className={styles.wrapper}>
        <FormattedDate
          date={new Date(dateFromServer)}
          className="text text_type_main-default text_color_inactive"
        />
        <div className={styles.total}>
          <p className="text text_type_digits-default">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
