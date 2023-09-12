import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCurrentCount } from "../../../../utils/utils";
import {
  SET_COUNTER,
  INCREASE_COUNTER,
  DELETE_COUNTER,
  SET_CURRENT_INGREDIENT,
  ADD_FILLING,
  SET_BUN,
  SET_MODAL_VISIBLE,
  SET_MODAL_CONTENT,
} from '../../../../services/actions/app';
import { ingredientPropType } from "../../../../utils/prop-types";


const Ingredient = ({ ingredient }) => {
  const { card, image, text, gap_column_2 } = styles;
  
  const dispatch = useDispatch();

  const { counters } = useSelector((store) => ({ ...store.ingredients }));
  
  const { bun } = useSelector((store) => ({ ...store.burgerConstructor }));

  const count = useMemo(() => {
    return getCurrentCount(counters, ingredient._id);
  }, [counters, ingredient._id]);

  const handleIngredientClick = (ingredient) => {
    if(bun._id === ingredient._id) {
      return;
    };

    const currentCount = getCurrentCount(counters, ingredient._id);
    const newBurgerIngredient = {
      ...ingredient,
      index: `${ingredient._id}#${currentCount + 1}`,
    };

    if (newBurgerIngredient.type === "bun") {
      dispatch({ type: DELETE_COUNTER, id: bun._id });
      dispatch({ type: SET_COUNTER, id: newBurgerIngredient._id, name: newBurgerIngredient.name });
      dispatch({ type: SET_BUN, bun: newBurgerIngredient });
      return;
    }
    
    if (currentCount === 0) {
      dispatch({ type: SET_COUNTER, id: newBurgerIngredient._id, name: newBurgerIngredient.name });
    } else {
      dispatch({ type: INCREASE_COUNTER, id: newBurgerIngredient._id });
    }

    dispatch({ type: ADD_FILLING, ingredient: newBurgerIngredient });
  };

  const handleOpenModal = (ingredient) => {
    dispatch({ type: SET_MODAL_VISIBLE });
    dispatch({ type: SET_MODAL_CONTENT, content: 'ingredient-details' });
    dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: ingredient });
  };

  return (
    <div
      className={card}
      onClick={() => {
        handleIngredientClick(ingredient); // добавление ингредиента в конструктор (временная реализация)
      }}
      onDoubleClick={() => {
        handleOpenModal(ingredient); // двойной клик - открытие модального окна
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
