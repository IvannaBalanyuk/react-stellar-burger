export const getCurrentCount = (counters, ingredientId) => {
  const counter = counters.find((item) => {
    return item.id === ingredientId;
  });
  if (counter) {
    return counter.count;
  } else {
    return 0;
  }
};

export const getIngredientById = (array, id) => {
  return array.find((item) => item._id === id);
};

export const getTotalCountOfIngredient = (element, array) => {
  const count = array.reduce(
    (total, item, index) => {
      if (item._id === element._id) {
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

const checkArray = (array) => {
  let result = true;
  array.forEach((element) => {
    if (!element) {
      result = false;
    }
  });
  return result;
};

export const checkOrdersIngredients = (array) => {
  return array.filter((item) => {
    return checkArray(item.ingredients);
  });
};

export const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};
