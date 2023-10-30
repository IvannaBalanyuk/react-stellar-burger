import React, { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./burger-ingredients.module.css";
import TabsPanel from "./components/tabs-panel/tabs-panel";
import IngredientsCategory from "./components/ingredients-category/ingredients-category";


const BurgerIngredients = React.memo(() => {
  const ingredients = useSelector((store) => store.burgerIngredients.ingredients);

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
    <div className={styles.container}>
        <TabsPanel
          refs={refs}
          current={current}
          setCurrent={setCurrent}
        />
        {ingredients.length > 0 && (
          <ul
            className={`${styles.list} custom-scroll`}
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
    </div>
  );
});

export default BurgerIngredients;
