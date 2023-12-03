import React, { useState, useRef, useMemo } from "react";
import styles from "./burger-ingredients.module.css";
import { useSelector } from "../../hooks/typedHooks";
import TabsPanel from "./components/tabs-panel/tabs-panel";
import IngredientsCategory from "./components/ingredients-category/ingredients-category";
import { TIngredient } from "../../utils/types";

const BurgerIngredients = React.memo(() => {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const categories = useMemo(() => {
    return {
      buns: ingredients.filter((item: TIngredient) => item.type === "bun"),
      sauces: ingredients.filter((item: TIngredient) => item.type === "sauce"),
      main: ingredients.filter((item: TIngredient) => item.type === "main"),
    };
  }, [ingredients]);

  const [current, setCurrent] = useState("bun");

  const containerRef = useRef<HTMLUListElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const refs: {
    bun: React.RefObject<HTMLDivElement>;
    sauce: React.RefObject<HTMLDivElement>;
    main: React.RefObject<HTMLDivElement>;
  } = {
    bun: bunRef,
    sauce: sauceRef,
    main: mainRef,
  };

  const handleScroll = () => {
    let containerScroll;
    if (containerRef && containerRef.current) {
      containerScroll = containerRef.current.getBoundingClientRect().top;
    }

    let bunScroll;
    if (refs.bun && refs.bun.current && containerScroll) {
      bunScroll =
        refs.bun.current.getBoundingClientRect().top - containerScroll;
    }

    let sauceScroll;
    if (refs.sauce && refs.sauce.current && containerScroll) {
      sauceScroll =
        refs.sauce.current.getBoundingClientRect().top - containerScroll;
    }

    let mainScroll;
    if (refs.main && refs.main.current && containerScroll) {
      mainScroll =
        refs.main.current.getBoundingClientRect().top - containerScroll;
    }

    const maxOffset = -30;

    if (bunScroll && bunScroll <= 0 && bunScroll > maxOffset) {
      setCurrent("bun");
    } else if (sauceScroll && sauceScroll <= 0 && sauceScroll > maxOffset) {
      setCurrent("sauce");
    } else if (mainScroll && mainScroll <= 0 && mainScroll > maxOffset) {
      setCurrent("main");
    }
  };

  return (
    <div className={styles.container}>
      <TabsPanel refs={refs} current={current} setCurrent={setCurrent} />
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
