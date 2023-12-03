export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TBurgerIngredient = TIngredient & {
  index: string;
};

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type TOrders = {
  success: boolean,
  orders: TOrder[],
  total: number | null,
  totalToday: number | null,
  socketConnectionStatus: string | null
};

export type TUser = { email: string; name: string };

export type TCounters = { id: string; name: string; count: number }[];

export type TInputValues<T extends string> = {
  [key in T]: string;
}
