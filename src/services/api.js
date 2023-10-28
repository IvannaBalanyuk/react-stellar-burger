const baseUrl = "https://norma.nomoreparties.space/api";

const checkResult = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

const refreshTokenRequest = () => {
  return fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getIngredientsRequest = () => {
  return fetch(`${baseUrl}/ingredients`, {
    method: "GET",
  }).then((res) => {
    return checkResult(res);
  });
};

const postOrderRequest = (data) => {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: data,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResult(res);
  });
};

// const postOrderWithRefreshRequest = (data) => {
//   return postOrderRequest(data).catch((err) => {
//     if (err === "jwt expired") {
//       refreshTokenRequest()
//         .then((res) => {
//           localStorage.setItem("refreshToken", res.refreshToken);
//           localStorage.setItem("accessToken", res.accessToken);
//         })
//         .then(() => {
//           return postOrderRequest(data).catch((err) => {
//             return Promise.reject(err);
//           });
//         })
//         .catch((err) => {
//           return Promise.reject(err);
//         });
//     }
//   });
// };

const getUserRequest = () => {
  return fetch(`${baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  }).then((res) => {
    return checkResult(res);
  });
};

const getUserWithRefreshRequest = () => {
  return getUserRequest().catch((err) => {
    if (err === "jwt expired") {
      refreshTokenRequest()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        })
        .then(() => {
          return getUserRequest().catch((err) => {
            return Promise.reject(err);
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
  });
};

const changeUserRequest = (data) => {
  return fetch(`${baseUrl}/auth/user`, {
    method: "PATCH",
    body: JSON.stringify({
      name: data.name,
      email: data.login,
      password: data.password,
    }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  }).then((res) => {
    return checkResult(res);
  });
};

const changeUserWithRefreshRequest = (data) => {
  return changeUserRequest(data).catch((err) => {
    if (err === "jwt expired") {
      refreshTokenRequest()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        })
        .then(() => {
          return changeUserRequest(data).catch((err) => {
            return Promise.reject(err);
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
  });
};

const loginRequest = (data) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResult(res);
  });
};

const logoutRequest = () => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResult(res);
  });
};

const registerRequest = (data) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResult(res);
  });
};

const forgotPasswordRequest = (data) => {
  return fetch(`${baseUrl}/password-reset`, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResult(res);
  });
};

const resetPasswordRequest = (data) => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({
      password: data.password,
      token: data.token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResult(res);
  });
};

export {
  getIngredientsRequest,
  postOrderRequest,
  getUserWithRefreshRequest,
  changeUserWithRefreshRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
};
