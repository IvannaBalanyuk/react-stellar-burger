const getCurrentCount = (counters, ingredientId) => {
  const counter = counters.find(item => {
    return item.id === ingredientId});
  if (counter) {
    return counter.count;
  } else {
    return 0;
  }
}

export { getCurrentCount };
