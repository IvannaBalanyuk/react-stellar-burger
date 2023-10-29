import styles from './ingredient.module.css';
import IngredientDetails from "../../components/burger-ingredients/components/ingredient-details/ingredient-details";

const Ingredient = () => {

  return (
    <main className={styles.content}>
      <section className={styles.section}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
        <IngredientDetails />
      </section>
    </main>
  );
};

export default Ingredient;
