import React, { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./burger-ingredients.module.css";
import TabsPanel from "./components/tabs-panel/tabs-panel";
import IngredientsCategory from "./components/ingredients-category/ingredients-category";
import Modal from "../modal/modal";
import IngredientDetails from "./components/ingredient-details/ingredient-details";

const BurgerIngredients = React.memo(() => {
  const { section, list } = styles;

  const [current, setCurrent] = useState('bun');

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const containerRef = useRef();  

  const handleScroll = () => {
    const containerScroll = containerRef.current.getBoundingClientRect().top;
    const bunScroll = bunRef.current.getBoundingClientRect().top - containerScroll;
    const sauceScroll = sauceRef.current.getBoundingClientRect().top - containerScroll;
    const mainScroll = mainRef.current.getBoundingClientRect().top - containerScroll;

    const maxOffset = -30;

    if (bunScroll <= 0 && bunScroll > maxOffset) {
      setCurrent('bun')
    } else if (sauceScroll <= 0 && sauceScroll > maxOffset) {
      setCurrent('sauce')
    } else if (mainScroll <= 0 && mainScroll > maxOffset) {
      setCurrent('main')
    }
  };

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

  return (
    <>
      <section className={`${section} pt-10 pb-10`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <TabsPanel bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} current={current} setCurrent={setCurrent} />
        {ingredients.length > 0 && (
          <ul className={`${list} custom-scroll`} onScroll={handleScroll} ref={containerRef}>
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
