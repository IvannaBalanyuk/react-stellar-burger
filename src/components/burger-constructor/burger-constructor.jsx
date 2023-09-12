import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./burger-constructor.module.css";
import {
  Button,
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCurrentCount } from "../../utils/utils";
import Modal from "../modal/modal";
import OrderDetails from "./components/order-details/order-details";
import {
  DECREASE_COUNTER,
  DELETE_COUNTER,
  DELETE_FILLING,
  SET_ORDER_INGREDIENTS,
  SET_MODAL_VISIBLE,
  SET_MODAL_CONTENT,
} from "../../services/actions/app";

const BurgerConstructor = React.memo(() => {
  const {
    section,
    list,
    item_type_bun,
    item_type_content,
    order,
    total,
    element,
  } = styles;

  const { fillings, bun } = useSelector((store) => ({ ...store.burgerConstructor }));

  const { ingredients, counters } = useSelector((store) => ({
    ...store.ingredients,
  }));

  const { isVisible, content } = useSelector((store) => ({ ...store.modal }));

  const dispatch = useDispatch();

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

  const handleOpenModal = () => {
    dispatch({ type: SET_ORDER_INGREDIENTS, ingredients: [...fillings, bun] });
    dispatch({ type: SET_MODAL_VISIBLE });
    dispatch({ type: SET_MODAL_CONTENT, content: "order-details" });
  };

  return (
    <>
      <section className={`${section} pt-25 pb-10 pl-4`}>
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
                <li
                  className={`ingredient ${item_type_content}`}
                  key={ingredient.index}
                  id={ingredient.index}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    extraClass={`${element}`}
                    handleClose={handleDeleteClick}
                  />
                </li>
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
