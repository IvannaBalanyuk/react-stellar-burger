import React, { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./burger-ingredients.module.css";
import TabsPanel from "./components/tabs-panel/tabs-panel";
import IngredientsCategory from "./components/ingredients-category/ingredients-category";
import Modal from "../modal/modal";
import IngredientDetails from "./components/ingredient-details/ingredient-details";

const BurgerIngredients = React.memo(() => {
  const { section, list } = styles;

  const { ingredients } = useSelector((store) => ({
    ingredients: store.burgerIngredients.ingredients,
  }));

  const { isVisible, content } = useSelector((store) => ({
    isVisible: store.modal.isVisible,
    content: store.modal.content,
  }));

  const categories = useMemo(() => {
    return {
      buns: ingredients.filter((item) => item.type === "bun"),
      sauces: ingredients.filter((item) => item.type === "sauce"),
      main: ingredients.filter((item) => item.type === "main"),
    }
  }, [ingredients]);

  const [current, setCurrent] = useState("bun");

  const containerRef = useRef();
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const refs = {
    bun: bunRef,
    sauce: sauceRef,
    main: mainRef,
  };

  const handleScroll = () => {
    const containerScroll = containerRef.current.getBoundingClientRect().top;
    const bunScroll =
      refs.bun.current.getBoundingClientRect().top - containerScroll;
    const sauceScroll =
      refs.sauce.current.getBoundingClientRect().top - containerScroll;
    const mainScroll =
      refs.main.current.getBoundingClientRect().top - containerScroll;

    const maxOffset = -30;

    if (bunScroll <= 0 && bunScroll > maxOffset) {
      setCurrent("bun");
    } else if (sauceScroll <= 0 && sauceScroll > maxOffset) {
      setCurrent("sauce");
    } else if (mainScroll <= 0 && mainScroll > maxOffset) {
      setCurrent("main");
    }
  };

  return (
    <>
      <section className={`${section} pt-10 pb-10`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <TabsPanel
          refs={refs}
          current={current}
          setCurrent={setCurrent}
        />
        {ingredients.length > 0 && (
          <ul
            className={`${list} custom-scroll`}
            onScroll={handleScroll}
            ref={containerRef}
          >
            <IngredientsCategory
              categoryName="Булки"
              categoryRef={refs.bun}
              ingredients={categories.buns}
            />
            <IngredientsCategory
              categoryName="Соусы"
              categoryRef={refs.sauce}
              ingredients={categories.sauces}
            />
            <IngredientsCategory
              categoryName="Начинки"
              categoryRef={refs.main}
              ingredients={categories.main}
            />
          </ul>
        )}
      </section>
      {isVisible && content === "ingredient-details" && (
        <Modal heading="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
});

export default BurgerIngredients;
