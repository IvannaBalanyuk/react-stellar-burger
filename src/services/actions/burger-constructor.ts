import {
  SET_BUN,
  ADD_FILLING,
  DELETE_FILLING,
  SORT_FILLINGS,
} from "../constants/index";
import { TBurgerIngredient, TIngredient } from "../../utils/types";

export type TSetBunAction = {
  readonly type: typeof SET_BUN;
  readonly payload: TIngredient | TBurgerIngredient;
};

export type TAddFillingAction = {
  readonly type: typeof ADD_FILLING;
  readonly payload: TBurgerIngredient;
};

export type TDeleteFillingAction = {
  readonly type: typeof DELETE_FILLING;
  readonly payload: string;
};

export type TSortFillingsAction = {
  readonly type: typeof SORT_FILLINGS;
  readonly payload: {
    readonly dropIndex: number;
    readonly dragIndex: number;
  }
};

export type TBurgerConstructorActions =
  | TSetBunAction
  | TAddFillingAction
  | TDeleteFillingAction
  | TSortFillingsAction;
