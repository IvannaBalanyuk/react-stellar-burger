import { useEffect } from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClick, modalRef }) => {

  const onOverlayClick = (e) => {
    if(e.target !== modalRef.current) {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener('click', onOverlayClick);

    return () => {
      document.removeEventListener('click', onOverlayClick);
    }
  }, []);

  return (
    <div className={styles.overlay} onClick={onOverlayClick}></div>
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
