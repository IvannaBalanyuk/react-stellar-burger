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

export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};
export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
};
export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly error: string;
};
export type TSetCounterAction = {
  readonly type: typeof SET_COUNTER;
  readonly id: string;
  readonly name: string;
};
export type TIncreaseCounterAction = {
  readonly type: typeof INCREASE_COUNTER;
  readonly id: string;
};
export type TDecreaseCounterAction = {
  readonly type: typeof DECREASE_COUNTER;
  readonly id: string;
};
export type TDeleteCounterAction = {
  readonly type: typeof DELETE_COUNTER;
  readonly id: string;
};

export type TBurgerIngredientsActions =
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsFailedAction
  | TSetCounterAction
  | TIncreaseCounterAction
  | TDecreaseCounterAction
  | TDeleteCounterAction;

export const getIngredients = () => {
  return function (dispatch) {
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
          ingredients: res.data,
        });
        if (initialBun) {
          dispatch({
            type: SET_BUN,
            bun: initialBun,
          });
          dispatch({
            type: SET_COUNTER,
            id: initialBun._id,
            name: initialBun.name,
          });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: `${err}`,
        });
      });
  };
};
