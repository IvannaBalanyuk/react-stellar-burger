import {
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_STOP,
  SET_USER_ORDERS_DATA,
  SET_USER_ORDERS_WS_CONNECTION_STATUS,
} from "../constants/index";
import { TOrders } from "../../utils/types";

export type TUserOrdersWSConnectionStartAction = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_START;
};
export type TUserOrdersWSConnectionStopAction = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_STOP;
};
export type TSetUserOrdersDataAction = {
  readonly type: typeof SET_USER_ORDERS_DATA;
  readonly payload: TOrders;
};
export type TSetUserOrdersWSConnectionStatusAction = {
  readonly type: typeof SET_USER_ORDERS_WS_CONNECTION_STATUS;
  readonly payload: string;
};

export type TUserOrdersActions =
  | TUserOrdersWSConnectionStartAction
  | TUserOrdersWSConnectionStopAction
  | TSetUserOrdersDataAction
  | TSetUserOrdersWSConnectionStatusAction;
