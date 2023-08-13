import { createRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ heading, children, modalRoot, onClick }) => {
  const {
    modal,
    container,
    wrapper,
    title,
    close,
  } = styles;

  const modalRef = createRef();

  const onOverlayClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClick();
    }
  }, [modalRef, onClick]);

  const handleEscapeClose = useCallback((e) => {
    if (e.key.toLowerCase() === 'escape') {
      onClick();
    }
  }, [onClick]);

  useEffect(() => {
    document.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', handleEscapeClose);
    }
  }, []);

  return createPortal(
    <>
      <ModalOverlay />
      <div className={container}>
        <div className={`${modal} pt-10 pr-10 pb-15 pl-10`} ref={modalRef}>
          <div className={wrapper}>
            <h2 className={`${title} text text_type_main-large`}>{heading}</h2>
            <span className={close}>
              <CloseIcon type="primary" onClick={onClick} />
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
  modalRoot: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
