import React from "react";
import styles from "./app.module.css";
import { ingredientsData } from "../../../utils/data";

import AppHeader from "../../app-header/app-header";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";

function App () {
  const [counters, setСounters] = React.useState({});
  const [burgerData, setBurgerData] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const getCurrentBun = () => {
    return burgerData.find(item => item.type === 'bun');
  }

  const getCurrentCount = (ingredient) => {
    return burgerData.filter(item => item._id === ingredient._id).length;
  }

  const updateTotalPrice = (data) => {
    const pricesArr = data.map(item => item.price);
    const newTotalPrice = pricesArr.reduce((previousValue, item) => {
      return previousValue + item;
  });
    setTotalPrice(newTotalPrice)
  }

  const handleIngredientClick = (ingredient) => {
    const currentBun = getCurrentBun();
    const currentCount = getCurrentCount(ingredient);
    const newBurgerIngredient = {...ingredient, number: `${ingredient._id}#${currentCount + 1}`};
    const newCounters = counters;
    
    setBurgerData([...burgerData, newBurgerIngredient]);
    updateTotalPrice([...burgerData, newBurgerIngredient]);

    if (newBurgerIngredient.type === 'bun' && currentBun) {
      const burgerDataLessBun = burgerData.filter(item => item._id !== currentBun._id);
      setBurgerData([...burgerDataLessBun, newBurgerIngredient]);
      updateTotalPrice([...burgerDataLessBun, newBurgerIngredient]);

      newCounters[`${currentBun._id}`] = 0;
      newCounters[`${newBurgerIngredient._id}`] = 1;
    } else if (newBurgerIngredient.type === 'bun' && !currentBun) {
      newCounters[`${newBurgerIngredient._id}`] = 1;
    } else {
      newCounters[`${newBurgerIngredient._id}`] = currentCount + 1;
    }

    setСounters(newCounters);
  }

  const handleDeleteClick = (e) => {
    const targetElement = e.target.closest('.ingredient');
    const targetIngredient = burgerData.find(item => item._id === targetElement.id.split('#')[0]);

    const newCounters = counters;
    const currentCount = getCurrentCount(targetIngredient);
    newCounters[`${targetIngredient._id}`] = currentCount - 1;
    setСounters(newCounters);

    const newBurgerData = burgerData.filter(item => item.number !== targetIngredient.number);
    updateTotalPrice(newBurgerData);
    setBurgerData(newBurgerData);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients 
          ingredients={ingredientsData} 
          counters={counters} 
          onClick={handleIngredientClick} />
        <BurgerConstructor 
          burgerData={burgerData} 
          onClick={handleDeleteClick} 
          totalPrice={totalPrice} />
      </main>
    </div>
  );
}

export default App;
