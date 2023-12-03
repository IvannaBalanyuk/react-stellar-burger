import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_COUNTER,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  DELETE_COUNTER,
} from '../constants/index';
import { TIngredient, TCounters } from "../../utils/types";
import { TBurgerIngredientsActions } from "../actions/burger-ingredients";

type TBurgerIngredientsState = {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsRequestError: string;
  counters: TCounters;
  currentIngredient: TIngredient | null;
};

const burgerIngredientsInitialState: TBurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsRequestError: '',
  counters: [],
  currentIngredient: null,
};

export const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action: TBurgerIngredientsActions): TBurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsFailed: false,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequestError: action.error,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    case SET_COUNTER: {
      return {
        ...state,
        counters: [
          ...state.counters,
          {
            id: action.id,
            name: action.name,
            count: 1,
          },
        ],
      };
    }
    case INCREASE_COUNTER: {
      return {
        ...state,
        counters: [...state.counters].map((item) =>
          item.id === action.id ? { ...item, count: ++item.count } : item
        ),
      };
    }
    case DECREASE_COUNTER: {
      return {
        ...state,
        counters: [...state.counters].map((item) =>
          item.id === action.id ? { ...item, count: --item.count } : item
        ),
      };
    }
    case DELETE_COUNTER: {
      return {
        ...state,
        counters: [...state.counters].filter((item) => item.id !== action.id),
      };
    }
    default: {
      return state;
    }
  }
};
