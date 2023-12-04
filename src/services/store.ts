import { Action, ActionCreator, combineReducers } from "redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
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
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_STOP,
  SET_USER_ORDERS_DATA,
  SET_USER_ORDERS_WS_CONNECTION_STATUS,
} from "./constants/index";
import { TAuthActions } from "./actions/auth";
import { TBurgerConstructorActions } from "./actions/burger-constructor";
import { TBurgerIngredientsActions } from "./actions/burger-ingredients";
import { TFeedOrdersActions } from "./actions/feed-orders";
import { TOrderActions } from "./actions/order";
import { TUserOrdersActions } from "./actions/user-orders";

const wsActionsFeedOrders = {
    wsInit: FEED_WS_CONNECTION_START,
    onStop: FEED_WS_CONNECTION_STOP,
    onMessage: SET_FEED_DATA,
    onOpen: SET_FEED_WS_CONNECTION_STATUS,
    onError: SET_FEED_WS_CONNECTION_STATUS,
    onClose: SET_FEED_WS_CONNECTION_STATUS,
  };

const wsActionsUserOrders = {
    wsInit: USER_ORDERS_WS_CONNECTION_START,
    onStop: USER_ORDERS_WS_CONNECTION_STOP,
    onMessage: SET_USER_ORDERS_DATA,
    onOpen: SET_USER_ORDERS_WS_CONNECTION_STATUS,
    onError: SET_USER_ORDERS_WS_CONNECTION_STATUS,
    onClose: SET_USER_ORDERS_WS_CONNECTION_STATUS,
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
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsActionsFeedOrders),
    socketMiddleware(wsActionsUserOrders)
  )
);

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof rootReducer>;

export type TAppActions =
  | TAuthActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TFeedOrdersActions
  | TOrderActions
  | TUserOrdersActions;

export type TAppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TAppActions>
>;

export type AppDispatch = typeof store.dispatch;
