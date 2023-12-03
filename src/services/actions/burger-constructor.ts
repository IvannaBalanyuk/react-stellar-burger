import {
  SET_BUN,
  ADD_FILLING,
  DELETE_FILLING,
  SORT_FILLINGS,
} from "../constants/index";
import { TBurgerIngredient } from "../../utils/types";

export type TSetBunAction = {
  readonly type: typeof SET_BUN;
  readonly bun: TBurgerIngredient;
};

export type TAddFillingAction = {
  readonly type: typeof ADD_FILLING;
  readonly filling: TBurgerIngredient;
};

export type TDeleteFillingAction = {
  readonly type: typeof DELETE_FILLING;
  readonly id: string;
};

export type TSortFillingsAction = {
  readonly type: typeof SORT_FILLINGS;
  readonly dropIndex: number;
  readonly dragIndex: number;
};

export type TBurgerConstructorActions =
  | TSetBunAction
  | TAddFillingAction
  | TDeleteFillingAction
  | TSortFillingsAction;
