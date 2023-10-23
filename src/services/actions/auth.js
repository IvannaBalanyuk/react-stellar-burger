import {
  getUserWithRefreshRequest,
  changeUserWithRefreshRequest,
  loginRequest,
  logoutRequest,
} from "../api";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

const setUser = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const getUser = () => {
  return (dispatch) => {
    return getUserWithRefreshRequest().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const changeUser = (data) => {
  return (dispatch) => {
    return changeUserWithRefreshRequest(data).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const login = (data) => {
  return (dispatch) => {
    return loginRequest(data).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return logoutRequest().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};
