import React from "react";
import styles from "./tabs-panel.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const TabsPanel = React.memo(
  ({ refs, current, setCurrent }) => {
    return (
      <div className={`${styles.wrapper} mb-10`}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => {
            setCurrent("bun");
            refs.bun.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => {
            setCurrent("sauce");
            refs.sauce.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => {
            setCurrent("main");
            refs.main.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Начинки
        </Tab>
      </div>
    );
  }
);

TabsPanel.propTypes = {
  refs: PropTypes.object.isRequired,
  current: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default TabsPanel;
