import React, {useState, createRef} from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';
import { ingredientsPropType } from '../../utils/prop-types';


const BurgerIngredients = React.memo(({ ingredients, counters, onClick }) => {
    const {section, wrapper, list_type_categories, list_type_ingredients} = styles;

    const [current, setCurrent] = useState('bun');
    const bunRef = createRef();
    const sauceRef = createRef();
    const mainRef = createRef();

    return (
      <section className={`${section} pt-10 pb-10`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <div className={`${wrapper} mb-10`}>
          <Tab 
            value='bun' 
            active={current === 'bun'} 
            onClick={
              () => {
                setCurrent('bun');
                bunRef.current.scrollIntoView();
              }
            }
          >
            Булки
          </Tab>
          <Tab 
            value='sauce' 
            active={current === 'sauce'} 
            onClick={
              () => {
                setCurrent('sauce');
                sauceRef.current.scrollIntoView();
              }
            }
          >
            Соусы
          </Tab>
          <Tab 
            value='main' 
            active={current === 'main'} 
            onClick={
              () => {
                setCurrent('main');
                mainRef.current.scrollIntoView();
              }
            }
          >
            Начинки
          </Tab>
        </div>
        {ingredients.length > 0 && (
          <ul className={`${list_type_categories} custom-scroll`}>
              <li id='bun'>
                <h2 className='text text_type_main-medium' ref={bunRef}>Булки</h2>
                  <ul className={`${list_type_ingredients} pl-4`}>
                    {ingredients.map((ingredient) =>
                      ingredient.type === 'bun' ? (
                        <Ingredient 
                          ingredient={ingredient} 
                          counters={counters} 
                          onClick={onClick} 
                          key={ingredient._id} 
                        />
                      ) : null,
                    )}
                  </ul>
              </li>
              <li id='sauce'>
                <h2 className='text text_type_main-medium' ref={sauceRef}>Соусы</h2>
                  <ul className={`${list_type_ingredients} pl-4`}>
                    {ingredients.map((ingredient) =>
                      ingredient.type === 'sauce' ? (
                        <Ingredient 
                          ingredient={ingredient} 
                          counters={counters} 
                          onClick={onClick} 
                          key={ingredient._id} 
                        />
                      ) : null,
                    )}
                  </ul>
              </li>
              <li id='main'>
                <h2 className='text text_type_main-medium' ref={mainRef}>Соусы</h2>
                  <ul className={`${list_type_ingredients} pl-4`}>
                    {ingredients.map((ingredient) =>
                      ingredient.type === 'main' ? (
                        <Ingredient 
                          ingredient={ingredient} 
                          counters={counters} 
                          onClick={onClick} 
                          key={ingredient._id} 
                        />
                      ) : null,
                    )}
                  </ul>
              </li>
          </ul>
        )}
      </section>
    );
  }
);

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropType,
  counters: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BurgerIngredients;