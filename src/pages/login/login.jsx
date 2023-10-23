import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import useForm from "../../hooks/useForm";
import { login } from "../../services/actions/auth";

const Login = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ ...values }));
  };

  return (
    <main className={styles.content}>
      <form className={styles.container} action="login" onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
          onChange={(e) => handleChange(e)}
          value={values.email}
          name={"email"}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={(e) => handleChange(e)}
          value={values.password}
          name={"password"}
          placeholder="Пароль"
          icon="ShowIcon"
          extraClass="mt-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6 mb-20"
        >
          Войти
        </Button>
        <div className={`${styles.wrapper} mb-2`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </p>
          <Link to="/register" className={styles.link}>
            <p className="text text_type_main-default">Зарегистрироваться</p>
          </Link>
        </div>
        <div className={`${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to="/forgot-password" className={styles.link}>
            <p className="text text_type_main-default">Восстановить пароль</p>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
