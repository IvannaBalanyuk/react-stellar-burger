import { checkOrdersIngredients } from "../utils/utils";
import { wsUrl } from "../utils/constants";
import { refreshTokenRequest } from "./api";

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;
    let isConnected = false;
    let reconnectTimer = 0;
    const { wsInit, onOpen, onError, onStop, onClose, onMessage } = wsActions;

    return (next) => (action) => {
      const { type, payload } = action;
      const { dispatch } = store;

      if (type === wsInit) {
        socket = new WebSocket(payload);
        isConnected = true;
      }

      if (socket) {
        socket.onopen = (event) => {
          console.log(event.type);
          dispatch({ type: onOpen, payload: event.type });
        };

        socket.onerror = (event) => {
          console.log(event.message);
          dispatch({ type: onError, payload: event.message });
        };

        socket.onclose = (event) => {
          console.log(event);
          if (isConnected) {
            reconnectTimer = setTimeout(() => {
              dispatch({ type: wsInit });
            }, 3000);
          }

          if (event.wasClean) {
            dispatch({ type: onClose, payload: "Closed correct" });
          } else {
            dispatch({ type: onClose, payload: "Closed uncorrect" });
          }
        };

        if (type === onStop) {
          console.log("stop");
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close(1000, "Пользователь покинул страницу");
        }

        socket.onmessage = (event) => {
          let data = JSON.parse(event.data);
          console.log(data);
          if (data.message === "Invalid or missing token") {
            refreshTokenRequest()
              .then((res) => {
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("accessToken", res.accessToken);
              })
              .then(() => {
                dispatch({
                  type: "USER_ORDERS_WS_CONNECTION_START",
                  payload: `wss://norma.nomoreparties.space/orders?token=${
                    localStorage.getItem("accessToken").split("Bearer ")[1]
                  }`,
                });
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }
          let chekedData = {
            ...data,
            orders: checkOrdersIngredients(data.orders),
          };
          dispatch({ type: onMessage, payload: chekedData });
        };
      }

      return next(action);
    };
  };
};
