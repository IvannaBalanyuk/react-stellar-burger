import {
  APPLY_ORDER_REQUEST,
  APPLY_ORDER_SUCCESS,
  APPLY_ORDER_FAILED,
} from "../constants/index";
import { postOrderWithRefreshRequest } from "../api";


export type TApplyOrderRequestAction = {
  readonly type: typeof APPLY_ORDER_REQUEST;
};
export type TApplyOrderSuccessAction = {
  readonly type: typeof APPLY_ORDER_SUCCESS;
  readonly number: number;
};
export type TApplyOrderFailedAction = {
  readonly type: typeof APPLY_ORDER_FAILED;
  readonly error: string;
};

export type TOrderActions =
  | TApplyOrderRequestAction
  | TApplyOrderSuccessAction
  | TApplyOrderFailedAction;


export const applyOrder = (idArr: string[]) => {
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
