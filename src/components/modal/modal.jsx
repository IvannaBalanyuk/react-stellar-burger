import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./components/modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { SET_CURRENT_INGREDIENT } from "../../services/actions/burger-ingredients";
import { SET_MODAL_HIDDEN } from "../../services/actions/modal";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ heading, children }) => {
  const {
    modal,
    container,
    wrapper,
    title,
    close,
  } = styles;
  
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscapeClose = (e) => {
      if (e.key.toLowerCase() === "escape") {
        dispatch({ type: SET_MODAL_HIDDEN });
        dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: {} });
      }
    };

    document.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    }
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch({ type: SET_MODAL_HIDDEN });
    dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: {} });
  };

  return createPortal(
    <>
      <ModalOverlay />
      <div className={container} id='modal-container'>
        <div className={`${modal} pt-10 pr-10 pb-15 pl-10`}>
          <div className={wrapper}>
            <h2 className={`${title} text text_type_main-large`}>{heading}</h2>
            <span className={close}>
              <CloseIcon type="primary" onClick={handleCloseModal} />
            </span>
          </div>
          {children}
        </div>
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.object.isRequired,
};

export default Modal;
