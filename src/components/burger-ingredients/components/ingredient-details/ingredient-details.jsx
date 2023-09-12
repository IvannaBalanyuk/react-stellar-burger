import React from "react";
import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";

const IngredientDetails = React.memo(() => {
  const {
    container,
    image,
    text,
    list,
    item,
  } = styles;

  const { ingredientForModal } = useSelector((store) => ({
    ...store.ingredients,
  }));

  return (
    <div className={container}>
      <img
        className={image}
        src={ingredientForModal.image_large}
        alt={ingredientForModal.name}
      />
      <span className={`${text} text text_type_main-medium mt-4 mb-8`}>
        {ingredientForModal.name}
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
            {ingredientForModal.calories}
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
            {ingredientForModal.proteins}
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
            {ingredientForModal.fat}
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
            {ingredientForModal.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
});

export default IngredientDetails;
