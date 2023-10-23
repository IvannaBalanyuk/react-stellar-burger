import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import useForm from "../../hooks/useForm";
import { resetPasswordRequest } from "../../services/api";

const ResetPassword = () => {
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({
    success: false,
    message: "",
  });
  const location = useLocation();
  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPasswordRequest({ ...values });
      setSuccess({ success: res.success, message: res.message });
    } catch (err) {
      setError({ error: true, message: err });
    }
  };

  return (
    <>
      {location.state?.from?.pathname !== "/forgot-password" && (
        <Navigate to="/forgot-password" />
      )}
      <main className={styles.content}>
        <form
          className={styles.container}
          action="reset-password"
          onSubmit={handleSubmit}
        >
          <h2 className="text text_type_main-medium">Восстановление пароля</h2>
          <PasswordInput
            placeholder={"Введите новый пароль"}
            onChange={(e) => {
              handleChange(e);
            }}
            value={values.password}
            name={"password"}
            icon="ShowIcon"
            extraClass="mt-6"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => {
              handleChange(e);
            }}
            value={values.token}
            name={"token"}
            extraClass="mt-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mt-6 mb-20"
          >
            Сохранить
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
            <Link to="/login" className={styles.link}>
              <p className="text text_type_main-default">Войти</p>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default ResetPassword;
