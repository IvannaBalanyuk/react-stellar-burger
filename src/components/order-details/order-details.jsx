import React from "react";
import doneImagePath from '../../images/order-accpeted-popup-done.png'
import styles from "./order-details.module.css";

const OrderDetails = React.memo(() => {
  const {
    order,
    wrapper,
    gap_row_8,
    gap_row_2,
    number,
    discription,
    image,
  } = styles;

  return (
    <div className={`${order} pt-4 pb-15`}>
      <div className={`${wrapper} ${gap_row_8}`}>
        <span className={`${number} text text_type_digits-large`}>034536</span>
        <span className={`${discription} text text_type_main-medium`}>идентификатор&nbsp;заказа</span>
      </div>
      <img
        className={image}
        src={doneImagePath}
        alt='Done/Заказ принят'
      />
      <div className={`${wrapper} ${gap_row_2}`}>
        <span className={`${discription} text text_type_main-default`}>Ваш&nbsp;заказ начали&nbsp;готовить</span>
        <span className={`${discription} text text_type_main-default text_color_inactive`}>Дождитесь&nbsp;готовности на&nbsp;орбитальной&nbsp;станции</span>
      </div>
    </div>
  );
});

export default OrderDetails;
