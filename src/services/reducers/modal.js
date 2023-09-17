import {
  SET_MODAL_HIDDEN,
  SET_MODAL_VISIBLE,
  SET_MODAL_CONTENT,
} from '../actions/modal';

const modalInitialState = {
  isVisible: false,
  content: '',
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
