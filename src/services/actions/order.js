import { postOrderWithRefreshRequest } from "../api";

export const APPLY_ORDER_REQUEST = "APPLY_ORDER_REQUEST";
export const APPLY_ORDER_SUCCESS = "APPLY_ORDER_SUCCESS";
export const APPLY_ORDER_FAILED = "APPLY_ORDER_FAILED";

export const applyOrder = (idArr) => {
  return function (dispatch) {
    dispatch({
      type: APPLY_ORDER_REQUEST,
    });
    postOrderWithRefreshRequest(idArr)
      .then((res) => {
        dispatch({
          type: APPLY_ORDER_SUCCESS,
          number: res.order.number,
        });
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
