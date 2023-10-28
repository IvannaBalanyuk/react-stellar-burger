import { useSelector, shallowEqual } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./home.module.css";
import Loader from "../../components/loader/loader";
import AppError from "../../components/app-error/app-error";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

const Home = () => {
  const { ingredientsRequest, ingredientsFailed, ingredientsRequestError } =
    useSelector(
      (store) => ({
        ingredientsRequest: store.burgerConstructor.ingredientsRequest,
        ingredientsFailed: store.burgerConstructor.ingredientsFailed,
        ingredientsRequestError:
          store.burgerConstructor.ingredientsRequestError,
      }),
      shallowEqual
    );

  return (
    <main className={styles.content}>
      <DndProvider backend={HTML5Backend}>
        {ingredientsRequest && <Loader size="large" />}
        {ingredientsFailed && <AppError error={ingredientsRequestError} />}
        {!ingredientsFailed && (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </DndProvider>
    </main>
  );
};

export default Home;
