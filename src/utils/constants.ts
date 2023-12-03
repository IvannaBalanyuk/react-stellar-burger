type Routes = {
  home: string;
  ingredientId: string;
  order: string;
  login: string;
  register: string;
  resetPassword: string;
  forgotPassword: string;
  profile: {
    index: string;
    orders: string;
    orderNumber: string;
  };
  feed: string;
  feedOrderNumber: string;
  page404: string;
};

export const routes: Routes = {
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

export const wsUrl: { feedOrders: string; userOrders: string } = {
  feedOrders: "wss://norma.nomoreparties.space/orders/all",
  userOrders: "wss://norma.nomoreparties.space/orders",
};
