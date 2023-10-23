import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import styles from "./app.module.css";
import {
  Home,
  Ingredient,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileForm,
  Page404,
} from "../../../pages/index";
import ErrorBoundary from "../../error-boundary/error-boundary";
import AppHeader from "../../app-header/app-header";
import Modal from "../../modal/modal";
import IngredientDetails from "../../burger-ingredients/components/ingredient-details/ingredient-details";
import OrderDetails from "../../burger-constructor/components/order-details/order-details";
import { checkUserAuth } from "../../../services/actions/auth";
import { OnlyAuth, OnlyUnAuth } from "../../protected-route";
import { getIngredients } from "../../../services/actions/burger-ingredients";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
          <Route path="/ingredients/:ingredientId" element={<Ingredient />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
            <Route index element={<ProfileForm />} />
          </Route>
          <Route path="*" element={<Page404 />} />
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
                <OnlyAuth
                  component={
                    <Modal onClose={handleModalClose}>
                      <OrderDetails />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
