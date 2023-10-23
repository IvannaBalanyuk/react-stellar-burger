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
import { routes } from "../../../utils/constants";

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
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.ingredientId} element={<Ingredient />} />
          <Route path={routes.login} element={<OnlyUnAuth component={<Login />} />} />
          <Route
            path={routes.register}
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path={routes.forgotPassword}
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path={routes.resetPassword}
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route path={routes.profile.index} element={<OnlyAuth component={<Profile />} />}>
            <Route index element={<ProfileForm />} />
          </Route>
          <Route path={routes.page404} element={<Page404 />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path={routes.ingredientId}
              element={
                <Modal heading="Детали ингредиента" onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path={routes.order}
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
