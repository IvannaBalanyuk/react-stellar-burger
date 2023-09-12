import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import Loader from '../../loader/loader';
import AppError from "../../app-error/app-error";
import ErrorBoundary from "../../error-boundary/error-boundary";
import AppHeader from "../../app-header/app-header";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import { getIngredients } from "../../../services/actions/app";

const App = () => {
  const {
    ingredientsRequest,
    ingredientsFailed,
    ingredientsRequestError
  } = useSelector((store) => ({ ...store.burgerConstructor }));
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <AppHeader />
        <main className={styles.content}>
          {ingredientsRequest && <Loader size="large" />}
          {ingredientsFailed && <AppError error={ingredientsRequestError} />}
          {!ingredientsFailed && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
