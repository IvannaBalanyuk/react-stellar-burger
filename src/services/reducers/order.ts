import {
  APPLY_ORDER_REQUEST,
  APPLY_ORDER_SUCCESS,
  APPLY_ORDER_FAILED,
} from '../constants/index';
import { TBurgerIngredient } from "../../utils/types";
import { TOrderActions } from "../actions/order";

type TOrderState = {
  orderIngredients: TBurgerIngredient[];
  orderNumber: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
  orderRequestError: string;
};

const orderInitialState: TOrderState = {
  orderIngredients: [],
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderRequestError: '',
};

export const orderReducer = (state = orderInitialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
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
