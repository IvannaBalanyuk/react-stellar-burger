import React, { useState } from "react";
import styles from "./tabs-panel.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const TabsPanel = React.memo(({ bunRef, sauceRef, mainRef }) => {
  const [current, setCurrent] = useState("bun");

  return (
    <div className={`${styles.wrapper} mb-10`}>
      <Tab
        value="bun"
        active={current === "bun"}
        onClick={() => {
          setCurrent("bun");
          bunRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "sauce"}
        onClick={() => {
          setCurrent("sauce");
          sauceRef.current.scrollIntoView({
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
          mainRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        Начинки
      </Tab>
    </div>
  );
});

TabsPanel.propTypes = {
  bunRef: PropTypes.object.isRequired,
  sauceRef: PropTypes.object.isRequired,
  mainRef: PropTypes.object.isRequired,
};

export default TabsPanel;
