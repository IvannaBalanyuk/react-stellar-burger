import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCurrentCount } from "../../utils/utils";
import BurgerIngredient from "./components/burger-ingredient/burger-ingredient";
import Modal from "../modal/modal";
import OrderDetails from "./components/order-details/order-details";
import {
  SET_COUNTER,
  INCREASE_COUNTER,
  DELETE_COUNTER,
  SET_BUN,
  ADD_FILLING,
  SET_ORDER_INGREDIENTS,
  SET_MODAL_VISIBLE,
  SET_MODAL_CONTENT,
} from "../../services/actions/app";

const BurgerConstructor = React.memo(() => {
  const {
    section,
    list,
    item_type_bun,
    order,
    total,
    element,
  } = styles;

  const dispatch = useDispatch();

  const { fillings, bun } = useSelector((store) => ({
    ...store.burgerConstructor,
  }));

  const { counters } = useSelector((store) => ({
    ...store.ingredients,
  }));

  const { isVisible, content } = useSelector((store) => ({ ...store.modal }));

  const totalPrice = useMemo(() => {
    if (fillings.length > 0) {
      const fillingsTotalPrice = fillings.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
      return fillingsTotalPrice + bun.price;
    } else {
      return bun.price;
    }
  }, [fillings, bun]);

  const handleOpenModal = () => {
    dispatch({ type: SET_ORDER_INGREDIENTS, ingredients: [...fillings, bun] });
    dispatch({ type: SET_MODAL_VISIBLE });
    dispatch({ type: SET_MODAL_CONTENT, content: "order-details" });
  };

  const onDropHandler = (ingredient) => {
    if (bun._id === ingredient._id) return;

    const currentCount = getCurrentCount(counters, ingredient._id);
    const newBurgerIngredient = {
      ...ingredient,
      index: `${ingredient._id}#${currentCount + 1}`,
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
    <>
      <section className={`${section} pt-25 pb-10 pl-4`} ref={dropTarget}>
        {bun.name && (
          <div className={item_type_bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`${element}`}
            />
          </div>
        )}
        <ul className={`${list} pr-2 pt-4 pb-4 custom-scroll`}>
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
        {bun.name && (
          <div className={item_type_bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`${element}`}
            />
          </div>
        )}
        <div className={`${order} mt-10 pr-4`}>
          <div className={total}>
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
      </section>
      {isVisible && content === "order-details" && (
        <Modal heading="">
          <OrderDetails />
        </Modal>
      )}
    </>
  );
});

export default BurgerConstructor;
