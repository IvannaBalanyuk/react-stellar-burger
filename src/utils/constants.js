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
    orderNumber: "/profile/orders/:orderNumber",
  },
  feed: "/feed",
  feedOrderDetails: "/feed/:orderNumber",
  page404: "*",
};
