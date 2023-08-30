import { useState, useReducer, useEffect } from "react";
import styles from "./app.module.css";
import { BurgerContext, CountersContext, TotalPriceContext } from "../../../services/app-context";
import { getIngredientsData } from "../../../utils/api";
import AppError from "../../app-error/app-error";
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

const totalPriceInitialState = 0;
const totalPriceReducer = (state, action) => {
  if (action.type === 'plus') {
    const newState = action.group !== 'bun' ? state + action.price : state + (action.price * 2);
    return newState;
  } else if (action.type === 'minus') {
    const newState = action.group !== 'bun' ? state - action.price : state - (action.price * 2);
    return newState;
  } else {
    throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const App = () => {

  const [error, setError] = useState({ hasError: false, error: null });
  const [ingredients, setIngredients] = useState([]);

  const [burgerState, burgerDispatcher] = useReducer(burgerReducer, burgerInitialState, undefined);
  const [countersState, countersDispatcher] = useReducer(countersReducer, countersInitialState, undefined);
  const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState, undefined);

  useEffect(() => {
    getIngredientsData()
      .then((ingredients) => {
        setError({ ...error, hasError: false });
        setIngredients(ingredients.data);
        const initialBun = ingredients.data.find(item => item.type === 'bun');
        if (initialBun) {
          burgerDispatcher({ type: 'add', ingredient: initialBun });
          countersDispatcher({ type: 'set', id: initialBun._id, currentCount: 0 });
          totalPriceDispatcher({ type: 'plus', group: initialBun.type, price: initialBun.price * 2 });
        };
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setError({ ...error, hasError: true, error: err });
      });
  }, []);

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <AppHeader />
        <main className={styles.content}>
          {error.hasError && <AppError error={error.error} />}
          {!error.hasError && (
            <BurgerContext.Provider value={{ burgerState, burgerDispatcher }}>
              <CountersContext.Provider value={{ countersState, countersDispatcher }}>
                <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
                  <BurgerIngredients ingredients={ingredients} />
                  <BurgerConstructor />
                </TotalPriceContext.Provider>
              </CountersContext.Provider>
            </BurgerContext.Provider>
          )}
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
