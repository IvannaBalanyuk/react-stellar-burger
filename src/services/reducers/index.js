import { combineReducers } from 'redux';
import {
  ingredientsReducer,
  burgerConstructorReducer,
  orderReducer,
  modalReducer,
} from './app';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  modal: modalReducer,
});
