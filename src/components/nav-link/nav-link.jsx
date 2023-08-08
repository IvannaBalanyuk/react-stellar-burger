import clsx from 'clsx';
import styles from './nav-link.module.css';

function NavLink({ extraClass = '', url, text, ...props }) {
  const className = clsx(
    'text',
    'text_type_main-default',
    extraClass
  );

  return (
    <li className='pt-4 pr-5 pb-4 pl-5'>
      <a className={styles.link} href={url}>
        {props.children}
        <span className={className}>{text}</span>
      </a>
    </li>
  );
}

export default NavLink;