import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_COUNTER,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  DELETE_COUNTER,
  SET_CURRENT_INGREDIENT,
  ADD_FILLING,
  DELETE_FILLING,
  SET_BUN,
  SET_ORDER_INGREDIENTS,
  APPLY_ORDER_REQUEST,
  APPLY_ORDER_SUCCESS,
  APPLY_ORDER_FAILED,
  SET_MODAL_HIDDEN,
  SET_MODAL_VISIBLE,
  SET_MODAL_CONTENT,
} from '../actions/app';

const ingredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsRequestError: '',
  counters: [],
  ingredientForModal: {},
};

const burgerConstructorInitialState = {
  fillings: [],
  bun: {},
};

const orderInitialState = {
  orderIngredients: [],
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderRequestError: '',
};

const modalInitialState = {
  isVisible: false,
  content: '',
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsFailed: false,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequestError: action.error,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    case SET_COUNTER: {
      return {
        ...state,
        counters: [
          ...state.counters,
          {
            id: action.id,
            name: action.name,
            count: 1,
          },
        ],
      };
    }
    case INCREASE_COUNTER: {
      return {
        ...state,
        counters: [...state.counters].map((item) =>
          item.id === action.id ? { ...item, count: ++item.count } : item
        ),
      };
    }
    case DECREASE_COUNTER: {
      return {
        ...state,
        counters: [...state.counters].map((item) =>
          item.id === action.id ? { ...item, count: --item.count } : item
        ),
      };
    }
    case DELETE_COUNTER: {
      return {
        ...state,
        counters: [...state.counters].filter((item) => item.id !== action.id),
      };
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        ingredientForModal: action.ingredient,
      };
    }
    default: {
      return state;
    }
  }
};

export const burgerConstructorReducer = (state = burgerConstructorInitialState, action) => {
  switch (action.type) {
    case ADD_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings, action.ingredient],
      };
    }
    case DELETE_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings].filter((item) => item.index !== action.index),
      };
    }
    case SET_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    default: {
      return state;
    }
  }
};

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case SET_ORDER_INGREDIENTS: {
      return {
        ...state,
        orderIngredients: action.ingredients,
      };
    }
    case APPLY_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case APPLY_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.number,
        orderFailed: false,
        orderRequest: false,
      };
    }
    case APPLY_ORDER_FAILED: {
      return {
        ...state,
        orderRequestError: action.error,
        orderFailed: true,
        orderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case SET_MODAL_HIDDEN: {
      return {
        ...state,
        isVisible: false,
      };
    }
    case SET_MODAL_VISIBLE: {
      return {
        ...state,
        isVisible: true,
      };
    }
    case SET_MODAL_CONTENT: {
      return {
        ...state,
        content: action.content,
      };
    }
    default: {
      return state;
    }
  }
};
