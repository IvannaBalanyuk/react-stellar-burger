import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
import { useSelector } from "../../hooks/typedHooks";
import { getIngredientById } from "../../utils/utils";
import { routes } from "../../utils/constants";
import { TOrder } from "../../utils/types";

type Props = {
  order: TOrder;
};

const OrderCard: FC<Props> = ({ order }) => {
  const location = useLocation();

  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const orderIngredients = order.ingredients.map((item: string) => {
    return getIngredientById({ array: ingredients, id: item });
  });

  const firstFiveIngredients = orderIngredients.slice(0, 5);

  let sixthIngredient = null;
  if (orderIngredients.length > 5) {
    sixthIngredient = orderIngredients[5];
  }

  const orderPrice = orderIngredients.reduce<number>((sum, item) => {
    if (item) {
      return sum + item.price;
    }
    return sum;
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
            <span
              className={`${styles.text}text text_type_main-default ${
                order.status === "done" ? "text_color_success" : ""
              }`}
            >
              {order.status === "done" ? "Выполнен" : "Готовится"}
            </span>
          )}
        </div>
        <div className={styles.wrapperRowDirection}>
          <ul className={styles.list}>
            {firstFiveIngredients.map((item, index) => {
              if (item) {
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
              }
              return <></>;
            })}
            {sixthIngredient && (
              <li
                className={`${styles.icon} ${styles.icon_with_counter}`}
                style={{
                  backgroundImage: `url(${sixthIngredient.image_mobile})`,
                }}
                key={5}
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

export default React.memo(OrderCard);
