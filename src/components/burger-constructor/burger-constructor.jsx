import React, { useState, useEffect, useCallback } from "react";
import styles from "./burger-constructor.module.css";
import {
  Button,
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { burgerPropType } from "../../utils/prop-types";

const BurgerConstructor = React.memo(({ burger, onClick }) => {
  const {
    section,
    list,
    item_type_bun,
    item_type_content,
    order,
    total,
    element,
    container,
  } = styles;

  const bun = burger.filter((item) => item.type === "bun")[0];
  const contentArr = burger.filter((item) => {
    return item.type !== "bun";
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (burger.length > 0) {
      const pricesArr = burger.map((item) => item.price);
      const newTotalPrice = pricesArr.reduce((previousValue, item) => {
        return previousValue + item;
      });
      setTotalPrice(newTotalPrice);
    }
  }, [burger]);

  const [modal, setModal] = useState({
    isVisible: false,
  });

  const handleOpenModal = useCallback(() => {
    setModal({
      ...modal,
      isVisible: true,
    });
  }, [modal]);

  const handleCloseModal = useCallback(() => {
    setModal({
      ...modal,
      isVisible: false,
    });
  }, [modal]);

  return (
    <>
      <section className={`${section} pt-25 pb-10 pl-4`}>
        {bun && (
          <div className={`${item_type_bun} pl-12 pr-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} + (верх)`}
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
                    handleClose={onClick}
                  />
                </li>
              );
            })}
        </ul>
        {bun && (
          <div className={`${item_type_bun} pl-12 pr-4`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} + (низ)`}
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
      <div className={container}>
      {modal.isVisible && (
        <Modal heading='' onClick={handleCloseModal}>
            <OrderDetails />
        </Modal>
      )}
      </div>
    </>
  );
});

BurgerConstructor.propTypes = {
  burger: burgerPropType,
  onClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
