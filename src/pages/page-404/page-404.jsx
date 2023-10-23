import { Link } from "react-router-dom";
import styles from "./page-404.module.css";

const Page404 = () => {
  return (
    <main className={styles.content}>
      <div className={styles.container}>
        <p className={`${styles.digits} text text_type_digits-large mb-6`}>
          404
        </p>
        <p className={`${styles.text} text text_type_main-default mb-8`}>
          Хмм... Страница не найдена. Она была удалена, либо вовсе
          не&nbsp;существовала на сайте
        </p>
        <div className={styles.wrapper}>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Вы можете вернуться назад, либо перейти
          </p>
          <Link to="/" className={styles.link}>
            <p className="text text_type_main-default"> на главную страницу</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page404;
