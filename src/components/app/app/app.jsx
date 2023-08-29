import { useState, useReducer, useEffect, useCallback } from "react";
import styles from "./app.module.css";
import { CountersContext, BurgerContext } from "../../../services/app-context";
import { getIngredientsData } from "../../../utils/api";
import ErrorBoundary from "../../error-boundary/error-boundary";
import AppHeader from "../../app-header/app-header";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";

const burgerInitialState = {ingredients: []};

const burgerReducer = (state, action) => {
  if (action.type === 'add') {
    const newIngredients = [...state.ingredients, action.ingredient];
    return { ingredients: newIngredients };
  } else if (action.type === 'remove') {
    const newIngredients = state.ingredients.filter(ingredient => {
      return ingredient.index !== action.ingredient.index;
    });
    return { ingredients: newIngredients };
  } else {
    throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const countersInitialState = {counters: {}};

const countersReducer = (state, action) => {
  const newCounters = state.counters;
  if (action.type === 'set') {
    newCounters[`${action.id}`] = action.currentCount + 1;
    return { counters: newCounters };
  } else if (action.type === 'reset') {
    newCounters[`${action.id}`] = action.currentCount - 1;
    return { counters: newCounters };
  } else {
    throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const App = () => {
  const [error, setError] = useState({
    hasError: false,
    error: null,
  });
  const [ingredients, setIngredients] = useState([]);
  const [countersState, countersDispatcher] = useReducer(countersReducer, countersInitialState, undefined);
  const [burgerState, burgerDispatcher] = useReducer(burgerReducer, burgerInitialState, undefined);

  useEffect(() => {
    getIngredientsData()
      .then((ingredients) => {
        setError({ ...error, hasError: false });
        setIngredients(ingredients.data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setError({ ...error, hasError: true, error: err });
      });
  }, []);

  const getCurrentBun = useCallback(() => {
    const burgerBuns = burgerState.ingredients.filter((item) => item.type === "bun");
    if (burgerBuns.length > 0) {
      return burgerBuns[0];
    } else {
      return;
    }
  }, [burgerState]);

  const getCurrentCount = useCallback(
    (ingredient) => {
      return burgerState.ingredients.filter((item) => item._id === ingredient._id).length;
    },
    [burgerState]
  );

  const handleIngredientClick = useCallback(
    (ingredient) => {
      const currentBun = getCurrentBun();
      const currentCount = getCurrentCount(ingredient);
      const newBurgerIngredient = {
        ...ingredient,
        index: `${ingredient._id}#${currentCount + 1}`,
      };

      if (currentBun && newBurgerIngredient.type === "bun") {
        if (currentBun._id !== ingredient._id) {
          burgerDispatcher({type: 'remove', ingredient: currentBun});
          burgerDispatcher({type: 'add', ingredient: newBurgerIngredient});
          countersDispatcher({type: 'reset', id: currentBun._id, currentCount: currentCount});
          countersDispatcher({type: 'set', id: newBurgerIngredient._id, currentCount: currentCount});
        } else {
          return;
        }
      } else {
        burgerDispatcher({type: 'add', ingredient: newBurgerIngredient});
        countersDispatcher({type: 'set', id: newBurgerIngredient._id, currentCount: currentCount});
      }
    },
    [getCurrentBun, getCurrentCount]
  );

  const handleDeleteClick = useCallback(
    (e) => {
      const targetElement = e.target.closest(".ingredient");
      const targetIngredient = burgerState.ingredients.find((item) => {
        return item._id === targetElement.id.split("#")[0];
      });
      const currentCount = getCurrentCount(targetIngredient);
      burgerDispatcher({type: 'remove', ingredient: targetIngredient});
      countersDispatcher({type: 'reset', id: targetIngredient._id, currentCount: currentCount});
    },
    [burgerState, getCurrentCount]
  );

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <AppHeader />
        <main className={styles.content}>
          {error.hasError && (
            <>
              <section className={styles.error}>
                <h1 className="text text_type_main-medium">
                  Что-то пошло не так :(
                </h1>
                <p className="text text_type_main-default">{error.error}</p>
                <p className="text text_type_main-default text_color_inactive">
                  В приложении произошла ошибка. Пожалуйста, перезагрузите
                  страницу.
                </p>
              </section>
            </>
          )}
          {!error.hasError && (
            <BurgerContext.Provider value={{ burgerState, burgerDispatcher }} >
              <CountersContext.Provider value={{ countersState, countersDispatcher }} >
                <BurgerIngredients
                  ingredients={ingredients}
                  onClick={handleIngredientClick}
                />
                <BurgerConstructor onClick={handleDeleteClick} />
              </CountersContext.Provider>
            </BurgerContext.Provider>
          )}
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
