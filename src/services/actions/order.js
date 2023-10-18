import { postOrderRequest } from "../api";

export const SET_ORDER_INGREDIENTS = "SET_ORDER_INGREDIENTS";
export const APPLY_ORDER_REQUEST = "APPLY_ORDER_REQUEST";
export const APPLY_ORDER_SUCCESS = "APPLY_ORDER_SUCCESS";
export const APPLY_ORDER_FAILED = "APPLY_ORDER_FAILED";

export function applyOrder(idArr) {
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
