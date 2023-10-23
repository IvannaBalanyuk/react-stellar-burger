import { Link } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import useForm from "../../hooks/useForm";
import { registerRequest } from "../../services/api";

const Register = () => {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerRequest({ ...values });
  };

  return (
    <main className={styles.content}>
      <form className={styles.container} action="register" onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          value={values.name}
          onChange={(e) => handleChange(e)}
          extraClass="mt-6"
        />
        <EmailInput
          placeholder="E-mail"
          name={"email"}
          value={values.email}
          onChange={(e) => handleChange(e)}
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          placeholder="Пароль"
          name={"password"}
          value={values.password}
          onChange={(e) => handleChange(e)}
          icon="ShowIcon"
          extraClass="mt-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6 mb-20"
        >
          Зарегистрироваться
        </Button>
        <div className={`${styles.wrapper} mb-2`}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link to="/login" className={styles.link}>
            <p className="text text_type_main-default">Войти</p>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Register;
