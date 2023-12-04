import { TIngredient, TUser, TOrder, TInputValues } from "../utils/types";

const baseUrl = "https://norma.nomoreparties.space/api";

const requestHeaders: HeadersInit = new Headers();
const authorization = localStorage.getItem("accessToken") ?? "Error";
requestHeaders.append("Content-Type", "application/json;charset=utf-8");
requestHeaders.append("authorization", authorization);

type TResponse = {
  success: boolean;
};

type TRefreshTokenResponse = TResponse & {
  accessToken: string;
  refreshToken: string;
};

type TIngredientsResponse = TResponse & {
  data: TIngredient[];
};

type TUserResponse = TResponse & {
  user: TUser;
};

type TUserWithTokenRefreshResponse = TRefreshTokenResponse & {
  user: TUser;
};

type TChangeUserResponse = TResponse & {
  message: string;
};

type TOrderResponse = TResponse & {
  order: TOrder;
};

type TOrdersResponse = TResponse & {
  orders: TOrder[];
};

const baseRequest = <T>(url: string, config: RequestInit): Promise<T> => {
  return fetch(url, config).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json() as Promise<T>;
  });
};

const refreshTokenRequest = () => {
  return baseRequest<TRefreshTokenResponse>(`${baseUrl}/auth/token`, {
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
  return baseRequest<TIngredientsResponse>(`${baseUrl}/ingredients`, {
    method: "GET",
  });
};

const postOrderRequest = (idArr: string[]) => {
  return baseRequest<TOrderResponse>(`${baseUrl}/orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: idArr,
    }),
    headers: requestHeaders,
  });
};

const postOrderWithRefreshRequest = (idArr: string[]) => {
  return postOrderRequest(idArr).catch((err) => {
    if (err === "jwt expired") {
      refreshTokenRequest()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        })
        .then(() => {
          return postOrderRequest(idArr).catch((err) => {
            return Promise.reject(err);
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
    return Promise.reject("Возникла неизвестная ошибка");
  });
};

const getUserRequest = () => {
  return baseRequest<TUserResponse>(`${baseUrl}/auth/user`, {
    method: "GET",
    headers: requestHeaders,
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
    return Promise.reject("Возникла неизвестная ошибка");
  });
};

const changeUserRequest = (data: TInputValues<string>) => {
  return baseRequest<TUserResponse>(`${baseUrl}/auth/user`, {
    method: "PATCH",
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
    headers: requestHeaders,
  });
};

const changeUserWithRefreshRequest = (data: TInputValues<string>) => {
  return changeUserRequest(data)
  .catch((err: string) => {
    if (err === "jwt expired") {
      refreshTokenRequest()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        })
        .then(() => {
          return changeUserRequest(data).catch((err: string) => {
            return Promise.reject(err);
          });
        })
        .catch((err: string) => {
          return Promise.reject(err);
        });
    }
    return Promise.reject(err);
  });
};

const loginRequest = (data: TInputValues<string>) => {
  return baseRequest<TUserWithTokenRefreshResponse>(`${baseUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const logoutRequest = () => {
  return baseRequest<TChangeUserResponse>(`${baseUrl}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const registerRequest = (data: TInputValues<string>) => {
  return baseRequest<TUserWithTokenRefreshResponse>(
    `${baseUrl}/auth/register`,
    {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const forgotPasswordRequest = (data: TInputValues<string>) => {
  return baseRequest<TChangeUserResponse>(`${baseUrl}/password-reset`, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const resetPasswordRequest = (data: TInputValues<string>) => {
  return baseRequest<TChangeUserResponse>(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({
      password: data.password,
      token: data.token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getOrderRequest = (data: TInputValues<string>) => {
  return baseRequest<TOrdersResponse>(`${baseUrl}/orders/${data}`, {
    method: "GET",
  });
};

export {
  getIngredientsRequest,
  postOrderRequest,
  postOrderWithRefreshRequest,
  getUserWithRefreshRequest,
  changeUserWithRefreshRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  refreshTokenRequest,
  getOrderRequest,
};
