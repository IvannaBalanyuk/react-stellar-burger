import { GET_USER_SUCCESS, SET_AUTH_CHECKED } from "../constants/index";
import { TUser, TInputValues } from "../../utils/types";
import {
  getUserWithRefreshRequest,
  changeUserWithRefreshRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "../api";

export type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
};

export type TSetAuthCheckedAction = {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly isAuthChecked: boolean;
};

export type TAuthActions = TGetUserSuccessAction | TSetAuthCheckedAction;

const setAuthChecked = (value: boolean) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

const setUser = (user: TUser | null) => ({
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

export const changeUser = (data: TInputValues<string>) => {
  return (dispatch) => {
    return changeUserWithRefreshRequest(data).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const login = (data: TInputValues<string>) => {
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

export const register = (data: TInputValues<string>) => {
  return (dispatch) => {
    return registerRequest(data).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};
