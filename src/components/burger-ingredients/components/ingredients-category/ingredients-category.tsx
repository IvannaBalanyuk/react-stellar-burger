import React, { FC } from "react";
import styles from "./ingredients-category.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { TIngredient } from "../../../../utils/types";

type Props = {
  categoryName: string;
  categoryRef: React.RefObject<HTMLDivElement>;
  ingredients: TIngredient[];
};

const IngredientsCategory: FC<Props> = ({
  categoryName,
  categoryRef,
  ingredients,
}) => {
  return (
    <li>
      <h2 className="text text_type_main-medium" ref={categoryRef}>
        {categoryName}
      </h2>
      <ul className={`${styles.list} pl-4`}>
        {ingredients.length > 0 &&
          ingredients.map((ingredient: TIngredient) => (
            <IngredientCard ingredient={ingredient} key={ingredient._id} />
          ))}
      </ul>
    </li>
  );
};

export default React.memo(IngredientsCategory);
