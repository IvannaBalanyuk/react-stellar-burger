import {
  SET_FEED_DATA,
  SET_FEED_WS_CONNECTION_STATUS,
} from "../constants/index";
import { TOrder } from "../../utils/types";
import { TFeedOrdersActions } from "../actions/feed-orders";

type TFeedOrdersState = {
  socketConnected: boolean;
  error: string | null;
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  connectionStatus?: string | null;
};

const feedOrdersAInitialState: TFeedOrdersState = {
  socketConnected: false,
  error: null,
  orders: [],
  total: 0,
  totalToday: 0,
  connectionStatus: null,
};

export const feedOrdersWsReducer = (
  state = feedOrdersAInitialState,
  action: TFeedOrdersActions
): TFeedOrdersState => {
  switch (action.type) {
    case SET_FEED_DATA:
      return {
        ...state,
        socketConnected: true,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case SET_FEED_WS_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.payload,
      };
    default:
      return state;
  }
};
