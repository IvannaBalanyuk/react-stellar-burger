import { getIngredientsRequest } from "../api";
import { SET_BUN } from './burger-constructor';

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const SET_COUNTER = "SET_COUNTER";
export const INCREASE_COUNTER = "INCREASE_COUNTER";
export const DECREASE_COUNTER = "DECREASE_COUNTER";
export const DELETE_COUNTER = "DELETE_COUNTER";
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsRequest()
      .then((res) => {
        const initialBun = res.data.find((item) => item.type === "bun");
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
