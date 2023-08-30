const getCurrentBun = (arr) => {
  const currentBun = arr.find(item => {
    return item.type === 'bun';
  });
  if (currentBun) {
    return currentBun;
  } else {
    return false;
  }
}

const getCurrentCount = (counters, ingredientId) => {
  const currentCount = counters[ingredientId];
  if (currentCount) {
    return currentCount;
  } else {
    return 0;
  }
}

export { getCurrentBun, getCurrentCount };
