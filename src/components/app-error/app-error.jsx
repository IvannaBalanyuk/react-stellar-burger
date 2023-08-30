import styles from "./app-error.module.css";
import PropTypes from "prop-types";

const AppError = ({ error }) => {
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

AppError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default AppError;
