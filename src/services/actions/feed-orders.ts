import {
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_STOP,
  SET_FEED_DATA,
  SET_FEED_WS_CONNECTION_STATUS,
} from "../constants/index";
import { TOrders } from "../../utils/types";

export type TFeedWSConnectionStartAction = {
  readonly type: typeof FEED_WS_CONNECTION_START;
};
export type TFeedWSConnectionStopAction = {
  readonly type: typeof FEED_WS_CONNECTION_STOP;
};
export type TSetFeedDataAction = {
  readonly type: typeof SET_FEED_DATA;
  readonly payload: TOrders;
};
export type TSetFeedWSConnectionStatusAction = {
  readonly type: typeof SET_FEED_WS_CONNECTION_STATUS;
  readonly payload: string;
};

export type TFeedOrdersActions =
  | TFeedWSConnectionStartAction
  | TFeedWSConnectionStopAction
  | TSetFeedDataAction
  | TSetFeedWSConnectionStatusAction;
