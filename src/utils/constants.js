export const routes = {
  home: "/",
  ingredientId: "/ingredients/:ingredientId",
  order: "/order",
  login: "/login",
  register: "/register",
  resetPassword: "/reset-password",
  forgotPassword: "/forgot-password",
  profile: {
    index: "/profile",
    orders: "/profile/orders",
    orderNumber: "/profile/orders/:number",
  },
  feed: "/feed",
  feedOrderNumber: "/feed/:number",
  page404: "*",
};

export const wsUrl = {
  feedOrders: "wss://norma.nomoreparties.space/orders/all",
  userOrders: "wss://norma.nomoreparties.space/orders",
};
