import React, { useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useDrop } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCurrentCount } from "../../utils/utils";
import BurgerIngredient from "./components/burger-ingredient/burger-ingredient";
import {
  SET_COUNTER,
  INCREASE_COUNTER,
  DELETE_COUNTER,
} from "../../services/actions/burger-ingredients";
import {
  SET_BUN,
  ADD_FILLING,
} from "../../services/actions/burger-constructor";
import { applyOrder } from "../../services/actions/order";
import { routes } from "../../utils/constants";

const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { fillings, bun } = useSelector(
    (store) => ({
      fillings: store.burgerConstructor.fillings,
      bun: store.burgerConstructor.bun,
    }),
    shallowEqual
  );

  const counters = useSelector((store) => store.burgerIngredients.counters);

  const totalPrice = useMemo(() => {
    if (fillings.length > 0) {
      const fillingsTotalPrice = fillings.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
      return fillingsTotalPrice + bun.price;
    } else if (bun !== null) {
      return bun.price;
    } else {
      return 0;
    }
  }, [fillings, bun]);

  const handleOpenModal = () => {
    const idArr = [...fillings, bun].map((item) => item._id);
    if (idArr.length >= 1) {
      navigate(routes.order, { state: { background: location } });
      dispatch(applyOrder(idArr));
    }
  };

  const onDropHandler = (ingredient) => {
    if (bun._id === ingredient._id) return;

    const currentCount = getCurrentCount(counters, ingredient._id);
    const newBurgerIngredient = {
      ...ingredient,
      index: `${uuidv4()}`,
    };

    if (newBurgerIngredient.type === "bun") {
      dispatch({ type: DELETE_COUNTER, id: bun._id });
      dispatch({
        type: SET_COUNTER,
        id: newBurgerIngredient._id,
        name: newBurgerIngredient.name,
      });
      dispatch({ type: SET_BUN, bun: newBurgerIngredient });
      return;
    }

    if (currentCount === 0) {
      dispatch({
        type: SET_COUNTER,
        id: newBurgerIngredient._id,
        name: newBurgerIngredient.name,
      });
    } else {
      dispatch({ type: INCREASE_COUNTER, id: newBurgerIngredient._id });
    }

    dispatch({ type: ADD_FILLING, ingredient: newBurgerIngredient });
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  return (
    <div className={`${styles.container} pl-4`} ref={dropTarget}>
      {bun && (
        <div className={styles.item_type_bun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`${styles.element}`}
          />
        </div>
      )}
      <ul className={`${styles.list} pr-2 pt-4 pb-4 custom-scroll`}>
        {fillings.length > 0 &&
          fillings.map((ingredient) => {
            return (
              <BurgerIngredient
                key={ingredient.index}
                ingredient={ingredient}
              />
            );
          })}
      </ul>
      {bun && (
        <div className={styles.item_type_bun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`${styles.element}`}
          />
        </div>
      )}
      <div className={`${styles.order} mt-10 pr-4`}>
        <div className={styles.total}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
});

export default BurgerConstructor;
