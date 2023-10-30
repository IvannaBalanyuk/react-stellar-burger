import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
import { orderPropType } from "../../utils/prop-types";
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

  const firstFiveIngredients = orderIngredients.slice(0, 4);

  let sixthIngredient = null;
  if (orderIngredients.length > 5) {
    sixthIngredient = orderIngredients[5];
  }

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
            {firstFiveIngredients.map((item, index) => {
              return (
                <li
                  className={styles.icon}
                  key={index}
                  style={{
                    zIndex: `${7 - index}`,
                    backgroundImage: `url(${item.image_mobile})`,
                  }}
                ></li>
              );
            })}
            {sixthIngredient && (
              <li
                className={`${styles.icon} ${styles.icon_with_counter}`}
                style={{
                  backgroundImage: `url(${orderIngredients[5].image_mobile})`,
                }}
              >
                <p className={`${styles.count} text text_type_main-default`}>
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

OrderCard.propTypes = {
  order: orderPropType,
};

export default React.memo(OrderCard);
