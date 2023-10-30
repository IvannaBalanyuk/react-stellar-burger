import { combineReducers } from "redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { burgerIngredientsReducer } from "./reducers/burger-ingredients";
import { burgerConstructorReducer } from "./reducers/burger-constructor";
import { orderReducer } from "./reducers/order";
import { authReducer } from "./reducers/auth";
import { feedOrdersWsReducer } from "./reducers/feed-orders";
import { userOrdersWsReducer } from "./reducers/user-orders";
import { socketMiddleware } from "./socketMiddleware";
import {
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_STOP,
  SET_FEED_DATA,
  SET_FEED_WS_CONNECTION_STATUS,
} from "./actions/feed-orders";
import {
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_STOP,
  SET_USER_ORDERS_DATA,
  SET_USER_ORDERS_WS_CONNECTION_STATUS,
} from "./actions/user-orders";


const wsActions = {
  feedOrders: {
    wsInit: FEED_WS_CONNECTION_START,
    onStop: FEED_WS_CONNECTION_STOP,
    onMessage: SET_FEED_DATA,
    onOpen: SET_FEED_WS_CONNECTION_STATUS,
    onError: SET_FEED_WS_CONNECTION_STATUS,
    onClose: SET_FEED_WS_CONNECTION_STATUS,
  },
  userOrders: {
    wsInit: USER_ORDERS_WS_CONNECTION_START,
    onStop: USER_ORDERS_WS_CONNECTION_STOP,
    onMessage: SET_USER_ORDERS_DATA,
    onOpen: SET_USER_ORDERS_WS_CONNECTION_STATUS,
    onError: SET_USER_ORDERS_WS_CONNECTION_STATUS,
    onClose: SET_USER_ORDERS_WS_CONNECTION_STATUS,
  },
};

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  feedOrders: feedOrdersWsReducer,
  userOrders: userOrdersWsReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsActions.feedOrders),
    socketMiddleware(wsActions.userOrders)
  )
);

export const store = createStore(rootReducer, enhancer);
