import { TIngredient, TOrder, TOrders, TCounters } from "./types";

export const getCurrentCount = (
  counters: TCounters,
  ingredientId: string
): number => {
  const counter = counters.find((item) => {
    return item.id === ingredientId;
  });
  if (counter) {
    return counter.count;
  } else {
    return 0;
  }
};

export const getIngredientById = (data: {
  array: TIngredient[];
  id: string;
}) => {
  return data.array.find((item) => item._id === data.id) as TIngredient;
};

export const getTotalCountOfIngredient = (
  element: TIngredient | undefined,
  array: TIngredient[]
) => {
  const count = array.reduce(
    (total: { count: number; indexes: number[] }, item, index: number) => {
      if (element && item._id === element._id) {
        total.count += 1;
        total.indexes.push(index);
        return total;
      }
      return total;
    },
    { count: 0, indexes: [] }
  );
  return count;
};

const checkArray = (array: string[]): boolean => {
  let result = true;
  array.forEach((element) => {
    if (!element) {
      result = false;
    }
  });
  return result;
};

export const checkOrdersIngredients = (array: TOrder[]) => {
  return array.filter((item) => {
    return checkArray(item.ingredients);
  });
};

export const isEmptyObj = (obj: object) => {
  return Object.keys(obj).length === 0;
};
