import styles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function Ingredient ({ ingredient, counters, onClick }) {

  const count = counters[`${ingredient._id}`];

  return (
    <button className={styles.button} onClick={() => {onClick(ingredient)}}>
      <div className={styles.ingredient}>
        {count > 0 ? <Counter count={count} size='default' /> : null}
        <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name} />
        <span className={`${styles.price} text text_type_digits-default`}>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </span>
        <span className={`${styles.text} text text_type_main-default`}>{ingredient.name}</span>
      </div>
    </button>
  );
}

export default Ingredient;