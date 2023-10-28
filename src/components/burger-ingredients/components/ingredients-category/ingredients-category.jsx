import React from "react";
import styles from "./ingredients-category.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from "prop-types";
import { ingredientsPropType } from "../../../../utils/prop-types";

const IngredientsCategory = ({ categoryName, categoryRef, ingredients }) => {

  return (
    <li>
      <h2 className="text text_type_main-medium" ref={categoryRef}>
        {categoryName}
      </h2>
      <ul className={`${styles.list} pl-4`}>
        {ingredients.length > 0 &&
          ingredients.map((ingredient) => (
            <IngredientCard
              ingredient={ingredient}
              key={ingredient._id}
            />
          ))}
      </ul>
    </li>
  );

};

IngredientsCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
  categoryRef: PropTypes.object.isRequired,
  ingredients: ingredientsPropType,
};

export default React.memo(IngredientsCategory);
