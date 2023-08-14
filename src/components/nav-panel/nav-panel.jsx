import styles from "./nav-panel.module.css";

const NavPanel = ({ children }) => {
  return (
    <nav>
      <ul className={styles.list}>{children}</ul>
    </nav>
  );
};

export default NavPanel;
