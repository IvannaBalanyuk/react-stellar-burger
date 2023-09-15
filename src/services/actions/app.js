import { getIngredientsRequest, postOrderRequest } from "../api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const SET_COUNTER = "SET_COUNTER";
export const INCREASE_COUNTER = "INCREASE_COUNTER";
export const DECREASE_COUNTER = "DECREASE_COUNTER";
export const DELETE_COUNTER = "DELETE_COUNTER";
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";

export const SET_BUN = "SET_BUN";
export const ADD_FILLING = "ADD_FILLING";
export const DELETE_FILLING = "DELETE_FILLING";
export const SORT_FILLINGS = "SORT_FILLINGS";

export const SET_ORDER_INGREDIENTS = "SET_ORDER_INGREDIENTS";
export const APPLY_ORDER_REQUEST = "APPLY_ORDER_REQUEST";
export const APPLY_ORDER_SUCCESS = "APPLY_ORDER_SUCCESS";
export const APPLY_ORDER_FAILED = "APPLY_ORDER_FAILED";

export const SET_MODAL_HIDDEN = "SET_MODAL_HIDDEN";
export const SET_MODAL_VISIBLE = "SET_MODAL_VISIBLE";
export const SET_MODAL_CONTENT = "SET_MODAL_CONTENT";


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
