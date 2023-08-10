import clsx from 'clsx';
import styles from './nav-link.module.css';
import PropTypes from 'prop-types';

const NavLink = ({ extraClass = '', url, text, ...props }) => {
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

NavLink.propTypes = {
  extraClass: PropTypes.string,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}; 

export default NavLink;