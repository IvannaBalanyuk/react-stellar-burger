import React from "react";
import styles from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientDetails = React.memo(({ ingredient }) => {
  const {
    container,
    image,
    text,
    list,
    item
  } = styles;

  return (
    <div className={container}>
      <img
        className={image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <span className={`${text} text text_type_main-medium mt-4 mb-8`}>
        {ingredient.name}
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
            {ingredient.calories}
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
            {ingredient.proteins}
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
            {ingredient.fat}
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
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
});

IngredientDetails.propTypes = {
  ingredient: ingredientPropType
};

export default IngredientDetails;
