import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import styles from "./app.module.css";
import ErrorBoundary from "../../error-boundary/error-boundary";
import AppHeader from "../../app-header/app-header";
import { Home } from "../../../pages/index";
import Modal from "../../modal/modal";
import IngredientDetails from "../../burger-ingredients/components/ingredient-details/ingredient-details";
import OrderDetails from "../../burger-constructor/components/order-details/order-details";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <AppHeader />
        <main className={styles.content}>
          <Routes location={background || location}>
            <Route path="/" element={<Home />} />
            <Route
              path="/ingredients/:ingredientId"
              element={<IngredientDetails fullScrin={true} />}
            />
          </Routes>
          {background && (
            <Routes>
              <Route
                path="/ingredients/:ingredientId"
                element={
                  <Modal heading="Детали ингредиента" onClose={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path="/order"
                element={
                  <Modal onClose={handleModalClose}>
                    <OrderDetails />
                  </Modal>
                }
              />
              <Route path="*" element={<></>} />
            </Routes>
          )}
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
