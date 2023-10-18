import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from '../components/loader/loader';
import AppError from "../components/app-error/app-error";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { getIngredients } from "../services/actions/burger-ingredients";

const Home = () => {
  const { ingredientsRequest, ingredientsFailed, ingredientsRequestError } =
    useSelector((store) => ({
      ingredientsRequest: store.burgerConstructor.ingredientsRequest,
      ingredientsFailed: store.burgerConstructor.ingredientsFailed,
      ingredientsRequestError: store.burgerConstructor.ingredientsRequestError,
    }), shallowEqual);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
        <>
          {ingredientsRequest && <Loader size="large" />}
          {ingredientsFailed && <AppError error={ingredientsRequestError} />}
          {!ingredientsFailed && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          )}
        </>
  );
};

export default Home;
