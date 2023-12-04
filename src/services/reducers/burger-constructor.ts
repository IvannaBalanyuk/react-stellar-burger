import {
  SET_BUN,
  ADD_FILLING,
  DELETE_FILLING,
  SORT_FILLINGS,
} from '../constants/index';
import { TBurgerIngredient, TIngredient } from "../../utils/types";
import { TBurgerConstructorActions } from "../actions/burger-constructor";

type TBurgerConstructorState = {
  fillings: TBurgerIngredient[];
  bun: TBurgerIngredient | TIngredient | null;
};

const burgerConstructorInitialState: TBurgerConstructorState = {
  fillings: [],
  bun: null,
};

export const burgerConstructorReducer = (state = burgerConstructorInitialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
  switch (action.type) {
    case SET_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case ADD_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings, action.payload],
      };
    }
    case DELETE_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings].filter((item) => item._id !== action.payload),
      };
    }
    case SORT_FILLINGS: {
      const fillings = [...state.fillings];
      fillings.splice(
        action.payload.dropIndex,
        0,
        fillings.splice(action.payload.dragIndex, 1)[0] 
      )
      return {
        ...state,
        fillings: fillings,
      }
    }
    default: {
      return state;
    }
  }
};
