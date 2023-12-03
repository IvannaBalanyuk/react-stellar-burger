import {
  SET_BUN,
  ADD_FILLING,
  DELETE_FILLING,
  SORT_FILLINGS,
} from '../constants/index';
import { TBurgerIngredient } from "../../utils/types";
import { TBurgerConstructorActions } from "../actions/burger-constructor";

type TBurgerConstructorState = {
  fillings: TBurgerIngredient[];
  bun: TBurgerIngredient | null;
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
        bun: action.bun,
      };
    }
    case ADD_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings, action.filling],
      };
    }
    case DELETE_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings].filter((item) => item._id !== action.id),
      };
    }
    case SORT_FILLINGS: {
      const fillings = [...state.fillings];
      fillings.splice(
        action.dropIndex,
        0,
        fillings.splice(action.dragIndex, 1)[0] 
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
