import React from 'react';
import styles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';


const Ingredient = React.memo(({ ingredient, counters, onClick }) => {
    const {card, image, text, price, button} = styles;

    const count = counters[`${ingredient._id}`];

    return (
      <button className={button} onClick={() => {onClick(ingredient)}}>
        <div className={card}>
          {count > 0 ? <Counter count={count} size='default' /> : null}
          <img className={image} src={ingredient.image_mobile} alt={ingredient.name} />
          <span className={`${price} text text_type_digits-default`}>
            {ingredient.price}
            <CurrencyIcon type="primary" />
          </span>
          <span className={`${text} text text_type_main-default`}>{ingredient.name}</span>
        </div>
      </button>
    );
  }
);

Ingredient.propTypes = {
  ingredient: ingredientPropType,
  counters: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}; 

export default Ingredient;