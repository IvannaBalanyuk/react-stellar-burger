import React, { FC, useCallback } from "react";
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
  DELETE_FILLING,
  SORT_FILLINGS,
} from "../../../../services/constants/index";
import { TBurgerIngredient } from "../../../../utils/types";

type Props = {
  ingredient: TBurgerIngredient;
};

const BurgerIngredient: FC<Props> = ({ ingredient }) => {
  const dispatch = useDispatch();

  const { counters } = useSelector(
    (store) => ({
      counters: store.burgerIngredients.counters,
    }),
    shallowEqual
  );

  const fillings = useSelector((store) => store.burgerConstructor.fillings);

  const dropIndex = fillings.findIndex(
    (item: TBurgerIngredient) => item.index === ingredient.index
  );

  const handleDeleteClick = useCallback(
    (): void => {
      const currentCount = getCurrentCount(counters, ingredient._id);

      if (currentCount > 1) {
        dispatch({ type: DECREASE_COUNTER, id: ingredient._id });
      } else {
        dispatch({ type: DELETE_COUNTER, id: ingredient._id });
      }

      dispatch({ type: DELETE_FILLING, id: ingredient._id });
    },
    [dispatch, ingredient, counters]
  );

  const [{ opacity }, dragRef] = useDrag({
    type: "burger-ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, dropTarget] = useDrop(
    () => ({
      accept: "burger-ingredient",
      hover: (item: TBurgerIngredient) => {
        const dragIndex = fillings.findIndex(
          (filling: TBurgerIngredient) => filling.index === item.index
        );
        dispatch({
          type: SORT_FILLINGS,
          dragIndex: dragIndex,
          dropIndex: dropIndex,
        });
      },
      drop: (item: TBurgerIngredient) => {
        const dragIndex = fillings.findIndex(
          (filling: TBurgerIngredient) => filling.index === item.index
        );
        dispatch({
          type: SORT_FILLINGS,
          dragIndex: dragIndex,
          dropIndex: dropIndex,
        });
      },
    }),
    [fillings]
  );

  return (
    <li
      key={ingredient.index}
      data-index={ingredient.index}
      id={ingredient._id}
      ref={dropTarget}
      className={`ingredient ${styles.item_type_content}`}
      style={{ opacity }}
    >
      <div ref={dragRef}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass={`${styles.element}`}
        handleClose={handleDeleteClick}
      />
    </li>
  );
};

export default React.memo(BurgerIngredient);
