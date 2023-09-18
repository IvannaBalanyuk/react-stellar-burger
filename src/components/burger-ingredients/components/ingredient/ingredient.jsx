import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCurrentCount } from "../../../../utils/utils";
import { SET_CURRENT_INGREDIENT } from "../../../../services/actions/burger-ingredients";
import {
  SET_MODAL_VISIBLE,
  SET_MODAL_CONTENT,
} from "../../../../services/actions/modal";
import { ingredientPropType } from "../../../../utils/prop-types";

const Ingredient = ({ ingredient }) => {
  const { card, image, text, gap_column_2 } = styles;

  const dispatch = useDispatch();

  const counters = useSelector((store) => store.burgerIngredients.counters);

  const count = useMemo(() => {
    return getCurrentCount(counters, ingredient._id);
  }, [counters, ingredient._id]);

  const handleOpenModal = (ingredient) => {
    dispatch({ type: SET_MODAL_VISIBLE });
    dispatch({ type: SET_MODAL_CONTENT, content: "ingredient-details" });
    dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: ingredient });
  };

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <div
      className={card}
      ref={dragRef}
      onClick={() => {
        handleOpenModal(ingredient);
      }}
    >
      {count > 0 ? <Counter count={count} size="default" /> : null}
      <img
        className={image}
        src={ingredient.image_mobile}
        alt={ingredient.name}
      />
      <span className={`${text} ${gap_column_2} text text_type_digits-default`}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </span>
      <span className={`${text} text text_type_main-default`}>
        {ingredient.name}
      </span>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientPropType,
};

export default React.memo(Ingredient);
