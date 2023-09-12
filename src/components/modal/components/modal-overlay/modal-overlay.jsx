import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./modal-overlay.module.css";
import { SET_MODAL_HIDDEN } from "../../../../services/actions/app";
import PropTypes from "prop-types";

const ModalOverlay = ({ modalRef }) => {
  
  const dispatch = useDispatch();

  const onOverlayClick = (e) => {
    if(modalRef.current !== null && e.target === modalRef.current) {
      dispatch({ type: SET_MODAL_HIDDEN });
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
  modalRef: PropTypes.object.isRequired,
};

export default ModalOverlay;
