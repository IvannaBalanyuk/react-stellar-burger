import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
// import { ingredientPropType } from "../../../../utils/prop-types";
import { getIngredientById } from "../../utils/utils";
import { routes } from "../../utils/constants";

const OrderCard = ({ order }) => {
  const location = useLocation();
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const orderIngredients = order.ingredients.map((item) =>
    getIngredientById(ingredients, item)
  );
  const orderPrice = orderIngredients.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  const url =
    location.pathname === routes.feed
      ? `${routes.feed}/${order.number}`
      : `${routes.profile.orders}/${order.number}`;

  const dateFromServer = order.createdAt;

  return (
    <li className={styles.card}>
      <Link className={styles.link} to={url} state={{ background: location }}>
        <div className={styles.wrapperRowDirection}>
          <span className="text text_type_main-default text_color_inactive">
            {`#${order.number}`}
          </span>
          <FormattedDate
            date={new Date(dateFromServer)}
            className="text text_type_main-default text_color_inactive"
          />
        </div>
        <div className={styles.wrapperColumnDirection}>
          <span className={`${styles.text} text text_type_main-medium`}>
            {order.name}
          </span>
          {location.pathname === routes.profile.orders && (
            <span className={`${styles.text}text text_type_main-default`}>
              {order.status === "done" ? "Создан" : "Готовится"}
            </span>
          )}
        </div>
        <div className={styles.wrapperRowDirection}>
          <ul className={styles.list}>
            {orderIngredients.map((item, index) => {
              if (index <= 4) {
                const zIndex = 6 - index;
                return (
                  <li
                    className={styles.icon}
                    key={index}
                    style={{
                      zIndex: zIndex,
                      backgroundImage: `url(${item.image_mobile})`,
                    }}
                  ></li>
                );
              }
              return null;
            })}
            {orderIngredients.length > 5 && (
              <li
                className={styles.counter}
                style={{
                  zIndex: 1,
                  backgroundImage: `url(${orderIngredients[5].image_mobile})`,
                }}
              >
                <p className={`${styles.counter} text text_type_main-default`}>
                  {`+${orderIngredients.length - 5}`}
                </p>
              </li>
            )}
          </ul>
          <div className={styles.total}>
            <p className="text text_type_digits-default">{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

// OrderCard.propTypes = {
//   order: ingredientPropType,
// };

export default React.memo(OrderCard);
