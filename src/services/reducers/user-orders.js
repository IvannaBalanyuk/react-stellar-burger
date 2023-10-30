import {
  SET_USER_ORDERS_DATA,
  SET_USER_ORDERS_WS_CONNECTION_STATUS,
} from "../actions/user-orders";

const initialState = {
  socketConnected: false,
  orders: [],
  connectionStatus: null,
};

export const userOrdersWsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ORDERS_DATA:
      return {
        ...state,
        socketConnected: true,
        orders: action.payload.orders,
      };
    case SET_USER_ORDERS_WS_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.payload,
      };
    default:
      return state;
  }
};
