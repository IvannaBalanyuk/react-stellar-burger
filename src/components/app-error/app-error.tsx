import { FC } from "react";
import styles from "./app-error.module.css";

type Props = {
  error: string;
}

const AppError: FC<Props> = ({ error }) => {
  return (
    <section className={styles.error}>
      <h1 className="text text_type_main-medium">
        Что-то пошло не так :(
      </h1>
      <p className="text text_type_main-large">
        {error}
      </p>
      <p className={`${styles.discription} text text_type_main-default text_color_inactive`}>
        В приложении произошла ошибка. Пожалуйста,&nbsp;перезагрузите страницу.
      </p>
    </section>
  );
};

export default AppError;
