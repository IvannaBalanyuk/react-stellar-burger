import {
  SET_USER_ORDERS_DATA,
  SET_USER_ORDERS_WS_CONNECTION_STATUS,
} from "../constants/index";
import { TOrder } from "../../utils/types";
import { TUserOrdersActions } from "../actions/user-orders";

type TUserOrdersState = {
  socketConnected: boolean;
  orders: TOrder[];
  connectionStatus?: string | null;
};

const userOrdersInitialState: TUserOrdersState = {
  socketConnected: false,
  orders: [],
  connectionStatus: null,
};

export const userOrdersWsReducer = (state = userOrdersInitialState, action: TUserOrdersActions): TUserOrdersState => {
  switch (action.type) {
    case SET_USER_ORDERS_DATA:
      return {
        ...state,
        socketConnected: true,
        orders: action.orders,
      };
    case SET_USER_ORDERS_WS_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.status,
      };
    default:
      return state;
  }
};
