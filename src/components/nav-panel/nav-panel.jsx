import styles from './nav-panel.module.css';

function NavPanel(props) {
  return (
    <nav>
      <ul className={styles.list}>
        {props.children}
      </ul>
    </nav>
  );
}

export default NavPanel;