import {
  SET_ORDER_INGREDIENTS,
  APPLY_ORDER_REQUEST,
  APPLY_ORDER_SUCCESS,
  APPLY_ORDER_FAILED,
} from '../actions/order';

const orderInitialState = {
  orderIngredients: [],
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderRequestError: '',
};

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case SET_ORDER_INGREDIENTS: {
      return {
        ...state,
        orderIngredients: action.ingredients,
      };
    }
    case APPLY_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case APPLY_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.number,
        orderFailed: false,
        orderRequest: false,
      };
    }
    case APPLY_ORDER_FAILED: {
      return {
        ...state,
        orderRequestError: action.error,
        orderFailed: true,
        orderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
