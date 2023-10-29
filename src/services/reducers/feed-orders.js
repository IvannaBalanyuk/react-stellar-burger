import {
  SET_FEED_DATA,
  SET_FEED_WS_CONNECTION_STATUS,
} from "../actions/feed-orders";

const initialState = {
  socketConnected: false,
  error: undefined,
  orders: [],
  total: null,
  totalToday: null,
  connectionStatus: null,
};

export const feedOrdersWsReducer = (state = initialState, action) => {
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
