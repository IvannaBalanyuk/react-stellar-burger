import React, { createRef, useMemo } from "react";
import styles from "./burger-ingredients.module.css";
import TabsPanel from "../tabs-panel/tabs-panel";
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";
import { ingredientsPropType } from "../../utils/prop-types";

const BurgerIngredients = React.memo(({ ingredients, counters, onClick, onDoubleClick }) => {
  const { section, list_type_categories, list_type_ingredients } = styles;
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

  return (
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
                    onDoubleClick={onDoubleClick}
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
                    onDoubleClick={onDoubleClick}
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
                    onDoubleClick={onDoubleClick}
                    key={ingredient._id}
                  />
                ))}
            </ul>
          </li>
        </ul>
      )}
    </section>
  );
});

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropType,
  counters: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
