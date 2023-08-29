import React, { useContext } from "react";
import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { CountersContext } from "../../services/app-context";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

const Ingredient = ({ ingredient, onClick, onDoubleClick }) => {
  const { card, image, text, gap_column_2 } = styles;

  const { countersState } = useContext(CountersContext);
  const count = countersState.counters[`${ingredient._id}`];

  return (
    <div
      className={card}
      // одинарный клик - добавление ингредиента в конструктор (временная реализация, т.к. потом, вероятно, будем реализовывать drag-and-drop)
      onClick={() => {
        onClick(ingredient);
      }}
      // двойной клик - открытие модального окна
      onDoubleClick={() => {
        onDoubleClick(ingredient);
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
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export default React.memo(Ingredient);
