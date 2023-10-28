import { postOrderRequest } from "../api";

export const APPLY_ORDER_REQUEST = "APPLY_ORDER_REQUEST";
export const APPLY_ORDER_SUCCESS = "APPLY_ORDER_SUCCESS";
export const APPLY_ORDER_FAILED = "APPLY_ORDER_FAILED";

export const applyOrder = (idArr) => {
  return function (dispatch) {
    dispatch({
      type: APPLY_ORDER_REQUEST,
    });
    postOrderRequest(idArr)
      .then((res) => {
        dispatch({
          type: APPLY_ORDER_SUCCESS,
          number: res.order.number,
        });
        localStorage.setItem('number', res.order.number);
        console.log(localStorage.getItem('number'));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        dispatch({
          type: APPLY_ORDER_FAILED,
          error: `${err}`,
        });
      });
  };
};
