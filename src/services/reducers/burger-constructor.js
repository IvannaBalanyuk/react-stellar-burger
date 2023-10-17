import {
  SET_BUN,
  ADD_FILLING,
  DELETE_FILLING,
  SORT_FILLINGS,
} from '../actions/burger-constructor';

const burgerConstructorInitialState = {
  fillings: [],
  bun: null,
};

export const burgerConstructorReducer = (state = burgerConstructorInitialState, action) => {
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
        fillings: [...state.fillings, action.ingredient],
      };
    }
    case DELETE_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings].filter((item) => item.index !== action.index),
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
