import { baseUrl } from "../utils/constants";

function checkResult(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

function getIngredientsData() {
  return fetch(baseUrl, {
    method: 'GET'
  })
  .then((res) => {
    return checkResult(res);
  });
}

export { getIngredientsData };