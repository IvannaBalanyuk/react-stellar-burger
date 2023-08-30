import { useState, useContext, useEffect } from "react";
import styles from "./order-details.module.css";
import doneImagePath from "../../images/order-accpeted-popup-done.png";
import { BurgerContext } from "../../services/app-context";
import { postOrderData } from "../../utils/api";
import AppError from "../app-error/app-error";

const OrderDetails = () => {
  const {
    order,
    wrapper,
    gap_row_8,
    gap_row_2,
    number,
    discription,
    image
  } = styles;

  const [error, setError] = useState({ hasError: false, error: null });
  const [orderNumber, setOrderNumber] = useState("");
  const { burgerState } = useContext(BurgerContext);

  useEffect(() => {
    const ingredients = burgerState.ingredients.map((item) => item._id);
    postOrderData({ ingredients })
      .then((data) => {
        setError({ ...error, hasError: false });
        setOrderNumber(data.order.number);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setError({ ...error, hasError: true, error: err });
      });
  }, []);

  return (
    <div className={`${order} pt-4 pb-15`}>
      {error.hasError && <AppError error={error.error} />}
      {!error.hasError && (
        <>
          <div className={`${wrapper} ${gap_row_8}`}>
            <span className={`${number} text text_type_digits-large`}>
              {orderNumber}
            </span>
            <span className={`${discription} text text_type_main-medium`}>
              идентификатор&nbsp;заказа
            </span>
          </div>
          <img className={image} src={doneImagePath} alt="Done/Заказ принят" />
          <div className={`${wrapper} ${gap_row_2}`}>
            <span className={`${discription} text text_type_main-default`}>
              Ваш&nbsp;заказ начали&nbsp;готовить
            </span>
            <span
              className={`${discription} text text_type_main-default text_color_inactive`}
            >
              Дождитесь&nbsp;готовности на&nbsp;орбитальной&nbsp;станции
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
