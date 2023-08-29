import React from "react";
import styles from "./ingredients-category.module.css";
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";
import { ingredientsPropType } from "../../utils/prop-types";

const IngredientsCategory = ({ categoryName, categoryRef, ingredients, onClick, onDoubleClick }) => {

  return (
    <li>
      <h2 className="text text_type_main-medium" ref={categoryRef}>
        {categoryName}
      </h2>
      <ul className={`${styles.list} pl-4`}>
        {ingredients.length > 0 &&
          ingredients.map((ingredient) => (
            <Ingredient
              ingredient={ingredient}
              onClick={onClick}
              onDoubleClick={onDoubleClick}
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
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export default React.memo(IngredientsCategory);
