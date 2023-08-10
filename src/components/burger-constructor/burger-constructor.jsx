import React, { useState } from "react";
import styles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerPropType } from '../../utils/prop-types';

const BurgerConstructor = React.memo(({ burger, onClick }) => {
    const {section, item_type_bun, list, item_type_content, order, total, element} = styles;
    
    const bun = burger.filter(item => item.type === 'bun')[0];
    const contentArr = burger.filter(item => {
      return item.type !== 'bun';
    });

    const [totalPrice, setTotalPrice] = useState(0);

    React.useEffect(() => {
        if (burger.length > 0) {
          const pricesArr = burger.map(item => item.price);
          const newTotalPrice = pricesArr.reduce((previousValue, item) => {
            return previousValue + item;
        });
          setTotalPrice(newTotalPrice);
        }
      },
      [burger]
    );

    return (
      <section className={`${section} pt-25 pb-10 pl-4`}>
        {bun && (
          <div className={`${item_type_bun} pl-12 pr-4`}>
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${bun.name} + (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`${element}`}
            />
          </div>
        )}
        <ul className={`${list} pr-2 pt-4 pb-4 custom-scroll`}>
          {contentArr.length > 0 && (
            contentArr.map((ingredient) => {
              return (
                <li className={`ingredient ${item_type_content}`} key={ingredient.index} id={ingredient.index}>
                  <DragIcon type='primary' />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    extraClass={`${element}`}
                    handleClose={onClick}
                  />
                </li>
              );
            })
          )}
        </ul>
        {bun && (
          <div className={`${item_type_bun} pl-12 pr-4`}>
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={`${bun.name} + (низ)`}
                price={bun.price}
                thumbnail={bun.image}
                extraClass={`${element}`}
              />
            </div>
        )}
        <div className={`${order} mt-10 pr-4`}>
          <div className={total}>
            <p className='text text_type_digits-medium'>
              {totalPrice}
            </p>
            <CurrencyIcon type='primary' />
          </div>
          <Button htmlType='button' type='primary' size='large'>
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
);

BurgerConstructor.propTypes = {
  burger: burgerPropType,
  onClick: PropTypes.func.isRequired
}; 

export default BurgerConstructor;