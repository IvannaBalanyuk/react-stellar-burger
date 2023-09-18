import React from "react";
import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";

const IngredientDetails = React.memo(() => {
  const { container, image, text, list, item } = styles;

  const currentIngredient = useSelector((store) => store.burgerIngredients.currentIngredient);

  return (
    <div className={container}>
      <img
        className={image}
        src={currentIngredient.image_large}
        alt={currentIngredient.name}
      />
      <span className={`${text} text text_type_main-medium mt-4 mb-8`}>
        {currentIngredient.name}
      </span>
      <ul className={list}>
        <li className={item}>
          <span
            className={`${text} text text_type_main-default text_color_inactive`}
          >
            Калории,&nbsp;ккал
          </span>
          <span
            className={`${text} text text_type_digits-default text_color_inactive`}
          >
            {currentIngredient.calories}
          </span>
        </li>
        <li className={item}>
          <span
            className={`${text} text text_type_main-default text_color_inactive`}
          >
            Белки,&nbsp;г
          </span>
          <span
            className={`${text} text text_type_digits-default text_color_inactive`}
          >
            {currentIngredient.proteins}
          </span>
        </li>
        <li className={item}>
          <span
            className={`${text} text text_type_main-default text_color_inactive`}
          >
            Жиры,&nbsp;г
          </span>
          <span
            className={`${text} text text_type_digits-default text_color_inactive`}
          >
            {currentIngredient.fat}
          </span>
        </li>
        <li className={item}>
          <span
            className={`${text} text text_type_main-default text_color_inactive`}
          >
            Углеводы,&nbsp;г
          </span>
          <span
            className={`${text} text text_type_digits-default text_color_inactive`}
          >
            {currentIngredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
});

export default IngredientDetails;
