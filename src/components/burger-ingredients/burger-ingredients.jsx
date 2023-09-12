import React, { createRef, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./burger-ingredients.module.css";
import TabsPanel from "./components/tabs-panel/tabs-panel";
import IngredientsCategory from "./components/ingredients-category/ingredients-category";
import Modal from "../modal/modal";
import IngredientDetails from "./components/ingredient-details/ingredient-details";

const BurgerIngredients = React.memo(() => {
  const { section, list } = styles;

  const { ingredients } = useSelector((store) => ({
    ...store.ingredients,
  }));

  const { isVisible, content } = useSelector((store) => ({
    ...store.modal,
  }));

  const buns = useMemo(() => {
    return ingredients.filter((item) => item.type === "bun");
  }, [ingredients]);

  const sauces = useMemo(() => {
    return ingredients.filter((item) => item.type === "sauce");
  }, [ingredients]);

  const main = useMemo(() => {
    return ingredients.filter((item) => item.type === "main");
  }, [ingredients]);

  const bunRef = createRef();
  const sauceRef = createRef();
  const mainRef = createRef();

  return (
    <>
      <section className={`${section} pt-10 pb-10`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <TabsPanel bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} />
        {ingredients.length > 0 && (
          <ul className={`${list} custom-scroll`}>
            <IngredientsCategory
              categoryName="Булки"
              categoryRef={bunRef}
              ingredients={buns}
            />
            <IngredientsCategory
              categoryName="Соусы"
              categoryRef={sauceRef}
              ingredients={sauces}
            />
            <IngredientsCategory
              categoryName="Начинки"
              categoryRef={mainRef}
              ingredients={main}
            />
          </ul>
        )}
      </section>
      {isVisible && content === 'ingredient-details' && (
        <Modal heading="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
});

export default BurgerIngredients;
