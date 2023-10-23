import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import useForm from "../../hooks/useForm";
import { forgotPasswordRequest } from "../../services/api";
import { routes } from "../../utils/constants";

const ForgotPassword = () => {
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({
    success: false,
    message: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { values, handleChange } = useForm({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPasswordRequest({ ...values });
      setSuccess({ success: res.success, message: res.message });
      navigate(routes.resetPassword, { state: { from: location } });
    } catch (err) {
      setError({ error: true, message: err });
    }
  };

  return (
    <main className={styles.content}>
      <form
        className={styles.container}
        action="forgot-password"
        onSubmit={handleSubmit}
      >
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          onChange={(e) => {
            handleChange(e);
          }}
          value={values.email}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mt-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6 mb-20"
        >
          Восстановить
        </Button>

        {success.success && (
            <p className="text text_type_main-default text_color_inactive mt-6">
              {success.message}
            </p>
          )}
        {error.error && (
          <p className="text text_type_main-default text_color_inactive mt-6">
            {error.message}
          </p>
        )}
        
        <div className={`${styles.wrapper} mb-2`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to={routes.login} className={styles.link}>
            <p className="text text_type_main-default">Войти</p>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default ForgotPassword;
