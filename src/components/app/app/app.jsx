import React, { useState } from 'react';
import styles from "./app.module.css";
import { ingredientsData } from "../../../utils/data";
import AppHeader from "../../app-header/app-header";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";

const App = () => {
  const [counters, setCounters] = useState({});
  const [burger, setBurger] = useState([]);

  const getCurrentBun = React.useCallback(() => {
    return burger.find(item => item.type === 'bun');
  }, [burger]);

  const getCurrentCount = React.useCallback((ingredient) => {
    return burger.filter(item => item._id === ingredient._id).length;
  }, [burger]);

  const handleIngredientClick = React.useCallback((ingredient) => {
      const currentBun = getCurrentBun();
      const currentCount = getCurrentCount(ingredient);
      const newBurgerIngredient = {...ingredient, index: `${ingredient._id}#${currentCount + 1}`};
      const newCounters = counters;

      setBurger([...burger, newBurgerIngredient]);

      if (newBurgerIngredient.type === 'bun' && currentBun) {
        const burgerLessBun = burger.filter(item => item._id !== currentBun._id);
        setBurger([...burgerLessBun, newBurgerIngredient]);

        newCounters[`${currentBun._id}`] = 0;
        newCounters[`${newBurgerIngredient._id}`] = 1;
      } else if (newBurgerIngredient.type === 'bun' && !currentBun) {
        newCounters[`${newBurgerIngredient._id}`] = 1;
      } else {
        newCounters[`${newBurgerIngredient._id}`] = currentCount + 1;
      }

      setCounters(newCounters);
    },
    [burger, counters, getCurrentBun, getCurrentCount]
  );

  const handleDeleteClick = React.useCallback((e) => {
      const targetElement = e.target.closest('.ingredient');
      const targetIngredient = burger.find(item => item._id === targetElement.id.split('#')[0]);

      const newCounters = counters;
      const currentCount = getCurrentCount(targetIngredient);
      newCounters[`${targetIngredient._id}`] = currentCount - 1;
      setCounters(newCounters);

      const newBurger = burger.filter(item => item.index !== targetIngredient.index);
      setBurger(newBurger);
    },
    [burger, counters, getCurrentCount]
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients 
          ingredients={ingredientsData} 
          counters={counters} 
          onClick={handleIngredientClick} 
        />
        <BurgerConstructor 
          burger={burger} 
          onClick={handleDeleteClick} 
        />
      </main>
    </div>
  );
}

export default App;
