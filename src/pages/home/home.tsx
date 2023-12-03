import { FC } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./home.module.css";
import Loader from "../../components/loader/loader";
import AppError from "../../components/app-error/app-error";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

const Home: FC = () => {
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
          <section className={`${styles.section} pt-10 pb-10 pl-5`}>
            <h2 className="text text_type_main-large">Соберите бургер</h2>
            <div className={styles.container}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </section>
        )}
      </DndProvider>
    </main>
  );
};

export default Home;
