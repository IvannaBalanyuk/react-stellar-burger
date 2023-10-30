import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./components/modal-overlay/modal-overlay";

const Modal = ({ heading, onClose, children }) => {
  const modalRef = useRef();

  const handleEscapeClose = (e) => {
    if (e.key.toLowerCase() === "escape") {
      onClose();
    }
  };

  const onOverlayClick = (e) => {
    if(modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClose);
    document.addEventListener('click', onOverlayClick);

    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
      document.removeEventListener('click', onOverlayClick);
    }
  });

  return (
    <div className={styles.container}>
      <ModalOverlay />
      <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`} ref={modalRef}>
        <div className={styles.wrapper}>
          <h2 className={`${styles.title} text text_type_main-large`}>{heading}</h2>
          <span className={styles.close}>
            <CloseIcon type="primary" onClick={onClose} />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  heading: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
