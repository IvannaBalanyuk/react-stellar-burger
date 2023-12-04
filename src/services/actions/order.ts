import {
  APPLY_ORDER_REQUEST,
  APPLY_ORDER_SUCCESS,
  APPLY_ORDER_FAILED,
} from "../constants/index";
import { postOrderWithRefreshRequest } from "../api";
import { AppDispatch, TAppThunk } from "../store";

export type TApplyOrderRequestAction = {
  readonly type: typeof APPLY_ORDER_REQUEST;
};
export type TApplyOrderSuccessAction = {
  readonly type: typeof APPLY_ORDER_SUCCESS;
  readonly payload: number;
};
export type TApplyOrderFailedAction = {
  readonly type: typeof APPLY_ORDER_FAILED;
  readonly payload: string;
};

export type TOrderActions =
  | TApplyOrderRequestAction
  | TApplyOrderSuccessAction
  | TApplyOrderFailedAction;

export const applyOrderThunk: TAppThunk = (idArr: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: APPLY_ORDER_REQUEST,
    });
    postOrderWithRefreshRequest(idArr)
      .then((res) => {
        dispatch({
          type: APPLY_ORDER_SUCCESS,
          payload: res.order.number,
        });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        dispatch({
          type: APPLY_ORDER_FAILED,
          payload: `${err}`,
        });
      });
  };
};
