import styles from './app-header.module.css';

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import NavPanel from '../nav-panel/nav-panel';
import NavLink from '../nav-link/nav-link';

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.content}>
        <NavPanel>
          <NavLink extraClass = '' url='#' text='Конструктор'>
            <BurgerIcon type='primary' />
          </NavLink>
          
          <NavLink extraClass = 'text_color_inactive' url='#' text='Лента заказов'>
            <ListIcon type='secondary' />
          </NavLink>
        </NavPanel>
        <div className={styles.wrapper}>
          <Logo />
        </div>
        <NavPanel>
          <NavLink extraClass = 'text_color_inactive' url='#' text='Личный кабинет'>
            <ProfileIcon type='secondary' />
          </NavLink>
        </NavPanel>
      </div>
    </header>
  );
}

export default AppHeader;