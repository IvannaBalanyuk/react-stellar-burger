import React from "react";
import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

const Ingredient = React.memo(({ ingredient, counters, onClick, onDoubleClick }) => {
  const { card, image, text, gap_column_2 } = styles;
  const count = counters[`${ingredient._id}`];

  return (
    <div className={card}
      onClick={() => {
        onClick(ingredient);
      }}
      onDoubleClick={() => {
        onDoubleClick('ingredient-details', ingredient);
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
});

Ingredient.propTypes = {
  ingredient: ingredientPropType,
  counters: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export default Ingredient;
