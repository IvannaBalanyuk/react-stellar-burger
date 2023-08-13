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
  const [appData, setAppData] = useState({
    ingredients: [],
    hasError: false,
    error: null,
  });
  const [counters, setCounters] = useState({});
  const [burger, setBurger] = useState([]);
  const [modal, setModal] = useState({
    isVisible: false,
    modalType: '',
    ingredient: null,
  });

  useEffect(() => {
    getIngredientsData(baseUrl)
      .then ((ingredients) => {
        setAppData({...appData, ingredients: ingredients.data});
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setAppData({...appData, hasError: true, error: err});
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

  const handleOpenModal = useCallback((type, ingredient = null) => {
    if(type === 'orderDetails') {
      setModal({
        ...modal,
        isVisible: true,
        modalType: type,
        ingredient: null,
      });
    } else {
      setModal({
        ...modal,
        isVisible: true,
        modalType: type,
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
          {appData.hasError && (
            <>
              <section className={styles.error}>
                <h1 className="text text_type_main-medium">Что-то пошло не так :(</h1>
                <p className="text text_type_main-default">{appData.error}</p>
                <p className="text text_type_main-default text_color_inactive">
                  В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
                </p>
              </section>
            </>
          )}
          {!appData.hasError && (
            <>
              <BurgerIngredients
                ingredients={appData.ingredients}
                counters={counters}
                onClick={handleIngredientClick}
                onDoubleClick={handleOpenModal}
              />
              <BurgerConstructor burger={burger} onClick={handleDeleteClick} onButtonClick={handleOpenModal} />
            </>
          )}
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
