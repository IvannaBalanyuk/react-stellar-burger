import { useState, useEffect, useCallback } from "react";
import styles from "./app.module.css";
import { getIngredientsData } from "../../../utils/api";
import ErrorBoundary from "../../error-boundary/error-boundary";
import AppHeader from "../../app-header/app-header";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";

const App = () => {
  const [appData, setAppData] = useState({
    ingredients: [],
    hasError: false,
    error: null,
  });
  const [counters, setCounters] = useState({});
  const [burger, setBurger] = useState([]);

  useEffect(() => {
    getIngredientsData()
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

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <AppHeader />
        <main className={styles.content}>
          {appData.hasError && (
            <>
              <section className={styles.error}>
                <h1 className="text text_type_main-medium">
                  Что-то пошло не так :(
                </h1>
                <p className="text text_type_main-default">{appData.error}</p>
                <p className="text text_type_main-default text_color_inactive">
                  В приложении произошла ошибка. Пожалуйста, перезагрузите
                  страницу.
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
              />
              <BurgerConstructor
                burger={burger}
                onClick={handleDeleteClick}
              />
            </>
          )}
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
