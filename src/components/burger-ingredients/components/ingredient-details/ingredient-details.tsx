import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styles from "./ingredient-details.module.css";
import { TIngredient } from "../../../../utils/types";


const IngredientDetails = React.memo(() => {
  const ingredients = useSelector((store) => store.burgerIngredients.ingredients);

  const location = useLocation();
  const ingredientId = location.pathname && location.pathname.split('/')[2];

  const currentIngredient = ingredients.find((item: TIngredient) => {
    return item._id === ingredientId;
  });

  return (
    <div className={styles.container}>
      {currentIngredient && (
        <>
          <img
            className={styles.image}
            src={currentIngredient.image_large}
            alt={currentIngredient.name}
          />
          <span className={`${styles.text} text text_type_main-medium mt-4 mb-8`}>
            {currentIngredient.name}
          </span>
          <ul className={styles.list}>
            <li className={styles.item}>
              <span
                className={`${styles.text} text text_type_main-default text_color_inactive`}
              >
                Калории,&nbsp;ккал
              </span>
              <span
                className={`${styles.text} text text_type_digits-default text_color_inactive`}
              >
                {currentIngredient.calories}
              </span>
            </li>
            <li className={styles.item}>
              <span
                className={`${styles.text} text text_type_main-default text_color_inactive`}
              >
                Белки,&nbsp;г
              </span>
              <span
                className={`${styles.text} text text_type_digits-default text_color_inactive`}
              >
                {currentIngredient.proteins}
              </span>
            </li>
            <li className={styles.item}>
              <span
                className={`${styles.text} text text_type_main-default text_color_inactive`}
              >
                Жиры,&nbsp;г
              </span>
              <span
                className={`${styles.text} text text_type_digits-default text_color_inactive`}
              >
                {currentIngredient.fat}
              </span>
            </li>
            <li className={styles.item}>
              <span
                className={`${styles.text} text text_type_main-default text_color_inactive`}
              >
                Углеводы,&nbsp;г
              </span>
              <span
                className={`${styles.text} text text_type_digits-default text_color_inactive`}
              >
                {currentIngredient.carbohydrates}
              </span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
});

export default IngredientDetails;
