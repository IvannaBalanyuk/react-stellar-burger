import React, { useContext } from "react";
import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCurrentBun, getCurrentCount } from "../../utils/utils";
import { BurgerContext, CountersContext, TotalPriceContext } from "../../services/app-context";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

const Ingredient = ({ ingredient, onDoubleClick }) => {
  const { card, image, text, gap_column_2 } = styles;

  const { burgerState, burgerDispatcher } = useContext(BurgerContext);
  const { countersState, countersDispatcher } = useContext(CountersContext);
  const { totalPriceDispatcher } = useContext(TotalPriceContext);

  const count = countersState.counters[ingredient._id];

  const handleIngredientClick = (ingredient) => {
      const currentBun = getCurrentBun(burgerState.ingredients);
      const currentCount = getCurrentCount(countersState.counters, ingredient._id);
      const currentBunCount = getCurrentCount(countersState.counters, currentBun._id);
      const newBurgerIngredient = {
        ...ingredient,
        index: `${ingredient._id}#${currentCount + 1}`,
      };

      if (currentBun && newBurgerIngredient.type === "bun") {
        if (currentBun._id !== ingredient._id) {
          burgerDispatcher({type: 'remove', ingredient: currentBun});
          burgerDispatcher({type: 'add', ingredient: newBurgerIngredient});
          countersDispatcher({type: 'reset', id: currentBun._id, currentCount: currentBunCount});
          countersDispatcher({type: 'set', id: newBurgerIngredient._id, currentCount: currentCount});
          totalPriceDispatcher({type: 'minus', price: currentBun.price * 2});
          totalPriceDispatcher({type: 'plus', price: newBurgerIngredient.price * 2});
        } else {
          return;
        }
      } else {
        burgerDispatcher({type: 'add', ingredient: newBurgerIngredient});
        countersDispatcher({type: 'set', id: newBurgerIngredient._id, currentCount: currentCount});
        totalPriceDispatcher({type: 'plus', price: newBurgerIngredient.price});
      }
    };

  return (
    <div
      className={card}
      // одинарный клик - добавление ингредиента в конструктор (временная реализация, т.к. потом, вероятно, будем реализовывать drag-and-drop)
      onClick={() => {
        handleIngredientClick(ingredient);
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
  onDoubleClick: PropTypes.func.isRequired,
};

export default React.memo(Ingredient);
