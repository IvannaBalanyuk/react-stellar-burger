import { useState, useEffect, useCallback } from "react";
import styles from "./app.module.css";
import { modalRoot, baseUrl } from "../../../utils/constants";
import { getIngredientsData } from "../../../utils/api";
import ErrorBoundary from "../../error-boundary/error-boundary";
import AppHeader from "../../app-header/app-header";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import Modal from "../../modal/modal";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import OrderDetails from "../../order-details/order-details";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [counters, setCounters] = useState({});
  const [burger, setBurger] = useState([]);
  const [modal, setModal] = useState({
    isVisible: false,
    ingredient: null,
  });

  useEffect(() => {
    getIngredientsData(baseUrl)
      .then ((ingredients) => {
        setIngredients(ingredients.data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  const getCurrentBun = useCallback(() => {
    return burger.find((item) => item.type === "bun");
  }, [burger]);

  const getCurrentCount = useCallback((ingredient) => {
    return burger.filter((item) => item._id === ingredient._id).length;
  }, [burger]);

  const handleIngredientClick = useCallback((ingredient) => {
    const currentBun = getCurrentBun();
    const currentCount = getCurrentCount(ingredient);
    const newBurgerIngredient = {
      ...ingredient,
      index: `${ingredient._id}#${currentCount + 1}`,
    };
    const newCounters = counters;

    setBurger([...burger, newBurgerIngredient]);

    if (newBurgerIngredient.type === "bun" && currentBun) {
      const burgerLessBun = burger.filter((item) => {
        return item._id !== currentBun._id;
      });
      setBurger([...burgerLessBun, newBurgerIngredient]);

      newCounters[`${currentBun._id}`] = 0;
      newCounters[`${newBurgerIngredient._id}`] = 1;
    } else if (newBurgerIngredient.type === "bun" && !currentBun) {
      newCounters[`${newBurgerIngredient._id}`] = 1;
    } else {
      newCounters[`${newBurgerIngredient._id}`] = currentCount + 1;
    }

    setCounters(newCounters);
  }, [burger, counters, getCurrentBun, getCurrentCount]);
  
  const handleDeleteClick = useCallback((e) => {
    const targetElement = e.target.closest(".ingredient");
    const targetIngredient = burger.find((item) => {
      return item._id === targetElement.id.split("#")[0];
    });

    const newCounters = counters;
    const currentCount = getCurrentCount(targetIngredient);
    newCounters[`${targetIngredient._id}`] = currentCount - 1;
    setCounters(newCounters);

    const newBurger = burger.filter((item) => {
      return item.index !== targetIngredient.index;
    });
    setBurger(newBurger);
  }, [burger, counters, getCurrentCount]);

  const handleOpenModal = useCallback((modalType, ingredient = null) => {
    if(!ingredient) {
      setModal({ ...modal, isVisible: true });
    } else {
      setModal({
        ...modal,
        isVisible: true,
        ingredient: ingredient,
      });
    }
  }, [modal]);

  const handleCloseModal = useCallback(() => {
    setModal({
      ...modal,
      isVisible: false,
      ingredient: null,
    });
  }, [modal]);

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <AppHeader />
        <main className={styles.content}>
          <BurgerIngredients
            ingredients={ingredients}
            counters={counters}
            onClick={handleIngredientClick}
            onDoubleClick={handleOpenModal}
          />
          <BurgerConstructor burger={burger} onClick={handleDeleteClick} onButtonClick={handleOpenModal} />
        </main>
        <div className={styles.container}>
        {modal.isVisible && modal.ingredient && (
          <Modal heading='Детали ингредиента' onClick={handleCloseModal} modalRoot={modalRoot}>
              <IngredientDetails ingredient={modal.ingredient} />
          </Modal>
        )}
        {modal.isVisible && !modal.ingredient && (
          <Modal heading='' onClick={handleCloseModal} modalRoot={modalRoot}>
              <OrderDetails />
          </Modal>
        )}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
