import { GET_USER_SUCCESS, SET_AUTH_CHECKED } from "../constants/index";
import { TUser, TInputValues } from "../../utils/types";
import {
  getUserWithRefreshRequest,
  changeUserWithRefreshRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "../api";
import { AppDispatch, TAppThunk } from "../store";

export type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser;
};

export type TSetAuthCheckedAction = {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
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

export const getUserThunk: TAppThunk = () => {
  return (dispatch: AppDispatch | TAppThunk) => {
    return getUserWithRefreshRequest().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const checkUserAuthThunk: TAppThunk = () => {
  return (dispatch: AppDispatch | TAppThunk) => {
    if (localStorage.getItem("accessToken")) {
      try {
        dispatch(getUserThunk());
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      } finally {
        dispatch(setAuthChecked(true));
      }
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const changeUserThunk: TAppThunk = (data: TInputValues<string>) => {
  return (dispatch: AppDispatch | TAppThunk) => {
    return changeUserWithRefreshRequest(data).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const loginThunk: TAppThunk = (data: TInputValues<string>) => {
  return (dispatch: AppDispatch | TAppThunk) => {
    return loginRequest(data).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const logoutThunk: TAppThunk = () => {
  return (dispatch: AppDispatch | TAppThunk) => {
    return logoutRequest().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};

export const registerThunk: TAppThunk = (data: TInputValues<string>) => {
  return (dispatch: AppDispatch | TAppThunk) => {
    return registerRequest(data).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};
