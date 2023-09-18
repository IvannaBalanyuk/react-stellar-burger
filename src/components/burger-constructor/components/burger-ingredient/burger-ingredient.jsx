import React, { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import styles from "./burger-ingredient.module.css";
import { getCurrentCount } from "../../../../utils/utils";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  DECREASE_COUNTER,
  DELETE_COUNTER,
} from "../../../../services/actions/burger-ingredients";
import {
  DELETE_FILLING,
  SORT_FILLINGS,
} from "../../../../services/actions/burger-constructor";
import { ingredientPropType } from "../../../../utils/prop-types";

const BurgerIngredient = ({ ingredient }) => {
  const { item_type_content, element } = styles;

  const dispatch = useDispatch();

  const { ingredients, counters } = useSelector((store) => ({
    ingredients: store.burgerIngredients.ingredients,
    counters: store.burgerIngredients.counters,
  }), shallowEqual);
  
  const fillings = useSelector((store) => store.burgerConstructor.fillings);

  const dropIndex = fillings.findIndex(
    (item) => item.index === ingredient.index
  );

  const handleDeleteClick = useCallback(
    (e) => {
      const targetElement = e.target.closest(".ingredient");
      const targetIngredient = ingredients.find(
        (item) => item._id === targetElement.id.split("#")[0]
      );
      const currentCount = getCurrentCount(counters, targetIngredient._id);

      if (currentCount > 1) {
        dispatch({ type: DECREASE_COUNTER, id: targetIngredient._id });
      } else {
        dispatch({ type: DELETE_COUNTER, id: targetIngredient._id });
      }

      dispatch({ type: DELETE_FILLING, index: targetElement.id });
    },
    [dispatch, ingredients, counters]
  );

  const [{ opacity }, dragRef] = useDrag({
    type: "burger-ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, dropTarget] = useDrop(() => ({
    accept: "burger-ingredient",
    hover: (item) => {
      const dragIndex = fillings.findIndex(
        (filling) => filling.index === item.index
      );
      dispatch({
        type: SORT_FILLINGS,
        dragIndex: dragIndex,
        dropIndex: dropIndex,
      });
    },
    drop: (item) => {
      const dragIndex = fillings.findIndex(
        (filling) => filling.index === item.index
      );
      dispatch({
        type: SORT_FILLINGS,
        dragIndex: dragIndex,
        dropIndex: dropIndex,
      });
    },
  }), [fillings]);

  return (
    <li
      key={ingredient.index}
      id={ingredient.index}
      ref={dropTarget}
      className={`ingredient ${item_type_content}`}
      style={{ opacity }}
    >
      <div ref={dragRef}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass={`${element}`}
        handleClose={handleDeleteClick}
      />
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
};

export default React.memo(BurgerIngredient);
