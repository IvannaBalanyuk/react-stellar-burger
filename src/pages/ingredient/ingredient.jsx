import styles from './ingredient.module.css';
import IngredientDetails from "../../components/burger-ingredients/components/ingredient-details/ingredient-details";

const Ingredient = () => {

  return (
    <main className={styles.content}>
      <div className={styles.container}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
        <IngredientDetails />
      </div>
    </main>
  );
};

export default Ingredient;
