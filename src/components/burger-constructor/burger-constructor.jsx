import React, { useState, useContext, useCallback } from "react";
import styles from "./burger-constructor.module.css";
import {
  Button,
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCurrentCount } from "../../utils/utils";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerContext, CountersContext, TotalPriceContext } from "../../services/app-context";

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

  const { burgerState, burgerDispatcher } = useContext(BurgerContext);
  const { countersState, countersDispatcher } = useContext(CountersContext);
  const { totalPriceState, totalPriceDispatcher } = useContext(TotalPriceContext);

  const bun = burgerState.ingredients.filter((item) => item.type === "bun")[0];
  const contentArr = burgerState.ingredients.filter((item) => {
    return item.type !== "bun";
  });

  const handleDeleteClick = useCallback(
    (e) => {
      const targetElement = e.target.closest(".ingredient");
      const targetIngredient = burgerState.ingredients.find((item) => item._id === targetElement.id.split("#")[0]);
      const currentCount = getCurrentCount(countersState.counters, targetIngredient._id);
      
      countersDispatcher({type: 'reset', id: targetIngredient._id, currentCount: currentCount});
      burgerDispatcher({type: 'remove', ingredient: targetIngredient});
      totalPriceDispatcher({type: 'minus', group: targetIngredient.type, price: targetIngredient.price});
    },
    [burgerState, burgerDispatcher, countersState, countersDispatcher, totalPriceDispatcher]
  );

  const [modal, setModal] = useState({ isVisible: false });

  const handleOpenModal = () => {
    setModal({ ...modal, isVisible: true });
  };

  const handleCloseModal = useCallback(() => {
    setModal({ ...modal, isVisible: false });
  }, [modal]);

  return (
    <>
      <section className={`${section} pt-25 pb-10 pl-4`}>
        {bun && (
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
          {contentArr.length > 0 &&
            contentArr.map((ingredient) => {
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
        {bun && (
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
            <p className="text text_type_digits-medium">{totalPriceState}</p>
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
      {modal.isVisible && (
        <Modal heading="" onClick={handleCloseModal}>
            <OrderDetails />
        </Modal>
      )}
    </>
  );
});

export default BurgerConstructor;
