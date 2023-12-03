import { shallowEqual } from "react-redux";
import styles from "./order-details.module.css";
import { useSelector } from "../../../../hooks/typedHooks";
import doneImage from "../../../../images/order-accpeted-popup-done.png";
import Loader from '../../../loader/loader';
import AppError from "../../../app-error/app-error";

const OrderDetails = () => {
  const {
    orderNumber,
    orderRequest,
    orderFailed,
    orderRequestError,
  } = useSelector((store) => ({
    orderNumber: store.order.orderNumber,
    orderRequest: store.order.orderRequest,
    orderFailed: store.order.orderFailed,
    orderRequestError: store.order.orderRequestError,
  }), shallowEqual);

  return (
    <div className={`${styles.order} pt-4 pb-15`}>
      {orderRequest && <Loader size="medium" />}
      {orderFailed && <AppError error={orderRequestError} />}
      {!orderFailed && (
        <>
          <div className={`${styles.wrapper} ${styles.gap_row_8}`}>
            <span className={`${styles.number} text text_type_digits-large`}>
              {orderNumber}
            </span>
            <span className={`${styles.discription} text text_type_main-medium`}>
              идентификатор&nbsp;заказа
            </span>
          </div>
          <img className={styles.image} src={doneImage} alt="Done/Заказ принят" />
          <div className={`${styles.wrapper} ${styles.gap_row_2}`}>
            <span className={`${styles.discription} text text_type_main-default`}>
              Ваш&nbsp;заказ начали&nbsp;готовить
            </span>
            <span
              className={`${styles.discription} text text_type_main-default text_color_inactive`}
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
