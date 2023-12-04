import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_COUNTER,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  DELETE_COUNTER,
  SET_BUN,
} from "../constants/index";
import { getIngredientsRequest } from "../api";
import { TIngredient } from "../../utils/types";
import { AppDispatch, TAppThunk } from "../store";


export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};
export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[];
};
export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly payload: string;
};
export type TSetCounterAction = {
  readonly type: typeof SET_COUNTER;
  readonly payload: {
    readonly id: string;
    readonly name: string;
  }
};
export type TIncreaseCounterAction = {
  readonly type: typeof INCREASE_COUNTER;
  readonly payload: string;
};
export type TDecreaseCounterAction = {
  readonly type: typeof DECREASE_COUNTER;
  readonly payload: string;
};
export type TDeleteCounterAction = {
  readonly type: typeof DELETE_COUNTER;
  readonly payload: string;
};

export type TBurgerIngredientsActions =
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsFailedAction
  | TSetCounterAction
  | TIncreaseCounterAction
  | TDecreaseCounterAction
  | TDeleteCounterAction;

export const getIngredientsThunk: TAppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsRequest()
      .then((res) => {
        const initialBun = res.data.find(
          (item: TIngredient) => item.type === "bun"
        );
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
        if (initialBun) {
          dispatch({
            type: SET_BUN,
            payload: initialBun,
          });
          dispatch({
            type: SET_COUNTER,
            payload: {
              id: initialBun._id,
              name: initialBun.name,
            }
          });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          payload: `${err}`,
        });
      });
  };
};
