import React, { createRef, useMemo, useState, useCallback } from "react";
import styles from "./burger-ingredients.module.css";
import TabsPanel from "../tabs-panel/tabs-panel";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientsPropType } from "../../utils/prop-types";

const BurgerIngredients = React.memo(({ ingredients }) => {
  const { section, list } = styles;

  const bunRef = createRef();
  const sauceRef = createRef();
  const mainRef = createRef();

  const buns = useMemo(() => {
    return ingredients.filter((item) => item.type === "bun");
  }, [ingredients]);

  const sauces = useMemo(() => {
    return ingredients.filter((item) => item.type === "sauce");
  }, [ingredients]);

  const main = useMemo(() => {
    return ingredients.filter((item) => item.type === "main");
  }, [ingredients]);

  const [modal, setModal] = useState({
    isVisible: false,
    ingredient: null,
  });

  const handleOpenModal = useCallback((ingredient) => {
    setModal({
      ...modal,
      isVisible: true,
      ingredient: ingredient,
    });
  }, [modal]);

  const handleCloseModal = useCallback(() => {
    setModal({
      ...modal,
      isVisible: false,
    });
  }, [modal]);

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
              onDoubleClick={handleOpenModal}
            />
            <IngredientsCategory
              categoryName="Соусы"
              categoryRef={sauceRef}
              ingredients={sauces}
              onDoubleClick={handleOpenModal}
            />
            <IngredientsCategory
              categoryName="Начинки"
              categoryRef={mainRef}
              ingredients={main}
              onDoubleClick={handleOpenModal}
            />
          </ul>
        )}
      </section>
      {modal.isVisible && modal.ingredient && (
        <Modal heading="Детали ингредиента" onClick={handleCloseModal}>
          <IngredientDetails ingredient={modal.ingredient} />
        </Modal>
      )}
    </>
  );
});

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropType,
};

export default BurgerIngredients;
