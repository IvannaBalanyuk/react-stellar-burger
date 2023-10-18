import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCurrentCount } from "../../../../utils/utils";

import { ingredientPropType } from "../../../../utils/prop-types";

const Ingredient = ({ ingredient }) => {
  const location = useLocation();
  const ingredientId = ingredient['_id'];

  const counters = useSelector((store) => store.burgerIngredients.counters);

  const count = useMemo(() => {
    return getCurrentCount(counters, ingredient._id);
  }, [counters, ingredient._id]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <div className={styles.card} ref={dragRef}>
      <Link
        key={ingredientId}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location, currentIngredient: ingredient }}
        className={styles.link}
      >
        {count > 0 ? <Counter count={count} size="default" /> : null}
        <img
          className={styles.image}
          src={ingredient.image_mobile}
          alt={ingredient.name}
        />
        <span
          className={`${styles.text} ${styles.gap_column_2} text text_type_digits-default`}
        >
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </span>
        <span className={`${styles.text} text text_type_main-default`}>
          {ingredient.name}
        </span>
      </Link>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientPropType,
};

export default React.memo(Ingredient);
