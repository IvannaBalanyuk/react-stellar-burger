import {
  GET_USER_SUCCESS,
  SET_AUTH_CHECKED,
} from "../constants/index";
import { TUser } from "../../utils/types";
import { TAuthActions } from "../actions/auth";

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
};

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    default:
      return state;
  }
};
