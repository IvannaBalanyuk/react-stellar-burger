import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderReducer } from "./order";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
});
