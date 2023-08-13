import React from "react";
import styles from "./error-boundary.module.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Возникла ошибка!", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className={styles.error}>
          <h1 className="text text_type_main-medium">Что-то пошло не так :(</h1>
          <p className="text text_type_main-default">
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;