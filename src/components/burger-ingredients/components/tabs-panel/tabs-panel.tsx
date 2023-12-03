import React, { FC } from "react";
import styles from "./tabs-panel.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  refs: {
    bun: React.RefObject<HTMLDivElement>;
    sauce: React.RefObject<HTMLDivElement>;
    main: React.RefObject<HTMLDivElement>;
  };
  current: string | undefined;
  setCurrent: any;
};

const TabsPanel: FC<Props> = React.memo(({ refs, current, setCurrent }) => {
  return (
    <div className={`${styles.wrapper} mb-10`}>
      <Tab
        value="bun"
        active={current === "bun"}
        onClick={() => {
          setCurrent("bun");
          if (refs.bun && refs.bun.current) {
            refs.bun.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "sauce"}
        onClick={() => {
          setCurrent("sauce");
          if (refs.sauce && refs.sauce.current) {
            refs.sauce.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === "main"}
        onClick={() => {
          setCurrent("main");
          if (refs.main && refs.main.current) {
            refs.main.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }}
      >
        Начинки
      </Tab>
    </div>
  );
});

export default TabsPanel;
