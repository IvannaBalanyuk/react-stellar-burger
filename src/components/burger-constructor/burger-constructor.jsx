import React from "react";
import styles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerPropType } from '../../utils/prop-types';

const BurgerConstructor = React.memo(({ burger, totalPrice, onClick }) => {
    const {section, bun, list, item, order, total, element} = styles;
    
    const bunsArr = burger.filter(item => item.type === 'bun');
    const contentArr = burger.filter(item => {
      return item.type === 'sauce' || item.type === 'main';
    });

    return (
      <section className={`${section} pt-25 pb-10 pl-4`}>
        {bunsArr.length > 0 && (
          <div className={`${bun} pl-12 pr-4`}>
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${bunsArr[0].name} + (верх)`}
              price={bunsArr[0].price}
              thumbnail={bunsArr[0].image}
              extraClass={`${element}`}
            />
          </div>
        )}
        <ul className={`${list} pr-2 pt-4 pb-4 custom-scroll`}>
          {contentArr.length > 0 && (
            contentArr.map((ingredient) => {
              return (
                <li className={`ingredient ${item}`} key={ingredient.index} id={ingredient.index}>
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
        {bunsArr.length > 0 && (
          <div className={`${bun} pl-12 pr-4`}>
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={`${bunsArr[0].name} + (низ)`}
                price={bunsArr[0].price}
                thumbnail={bunsArr[0].image}
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
  totalPrice: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}; 

export default BurgerConstructor;