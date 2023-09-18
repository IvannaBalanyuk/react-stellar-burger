const baseUrl = "https://norma.nomoreparties.space/api";

function checkResult(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

function getIngredientsRequest() {
  return fetch(`${baseUrl}/ingredients`, {
    method: "GET",
  }).then((res) => {
    return checkResult(res);
  });
}

function postOrderRequest(ingredients) {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: ingredients,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResult(res);
  });
}

export { getIngredientsRequest, postOrderRequest };
