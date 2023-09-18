import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./modal-overlay.module.css";
import { SET_CURRENT_INGREDIENT } from "../../../../services/actions/burger-ingredients";
import { SET_MODAL_HIDDEN } from "../../../../services/actions/modal";

const ModalOverlay = () => {
  
  const dispatch = useDispatch();

  const onOverlayClick = useCallback((e) => {
    if(e.target.id === 'modal-container') {
      dispatch({ type: SET_MODAL_HIDDEN });
      dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: {} });
    }
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('click', onOverlayClick);

    return () => {
      document.removeEventListener('click', onOverlayClick);
    }
  }, [onOverlayClick]);

  return (
    <div className={styles.overlay} onClick={onOverlayClick}></div>
  );
};

export default ModalOverlay;
