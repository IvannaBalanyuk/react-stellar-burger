import React, { createRef, useMemo, useState, useCallback } from "react";
import styles from "./burger-ingredients.module.css";
import TabsPanel from "../tabs-panel/tabs-panel";
import Ingredient from "../ingredient/ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { ingredientsPropType } from "../../utils/prop-types";

const BurgerIngredients = React.memo(({ ingredients, counters, onClick }) => {
  const {
    section,
    list_type_categories,
    list_type_ingredients,
    container,
  } = styles;

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

  const handleOpenModal = (ingredient) => {
    setModal({
      ...modal,
      isVisible: true,
      ingredient: ingredient,
    });
  };

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
          <ul className={`${list_type_categories} custom-scroll`}>
            <li id="bun">
              <h2 className="text text_type_main-medium" ref={bunRef}>
                Булки
              </h2>
              <ul className={`${list_type_ingredients} pl-4`}>
                {buns.length > 0 &&
                  buns.map((ingredient) => (
                    <Ingredient
                      ingredient={ingredient}
                      counters={counters}
                      onClick={onClick}
                      onDoubleClick={handleOpenModal}
                      key={ingredient._id}
                    />
                  ))}
              </ul>
            </li>
            <li id="sauce">
              <h2 className="text text_type_main-medium" ref={sauceRef}>
                Соусы
              </h2>
              <ul className={`${list_type_ingredients} pl-4`}>
                {sauces.length > 0 &&
                  sauces.map((ingredient) => (
                    <Ingredient
                      ingredient={ingredient}
                      counters={counters}
                      onClick={onClick}
                      onDoubleClick={handleOpenModal}
                      key={ingredient._id}
                    />
                  ))}
              </ul>
            </li>
            <li id="main">
              <h2 className="text text_type_main-medium" ref={mainRef}>
                Начинки
              </h2>
              <ul className={`${list_type_ingredients} pl-4`}>
                {main.length > 0 &&
                  main.map((ingredient) => (
                    <Ingredient
                      ingredient={ingredient}
                      counters={counters}
                      onClick={onClick}
                      onDoubleClick={handleOpenModal}
                      key={ingredient._id}
                    />
                  ))}
              </ul>
            </li>
          </ul>
        )}
      </section>
      <div className={container}>
      {modal.isVisible && modal.ingredient && (
        <Modal
          heading="Детали ингредиента"
          onClick={handleCloseModal}
        >
          <IngredientDetails ingredient={modal.ingredient} />
        </Modal>
      )}
      </div>
    </>
  );
});

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropType,
  counters: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
