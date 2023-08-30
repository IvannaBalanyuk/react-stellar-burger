import React from "react";
import AppError from "../app-error/app-error";

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
      return <AppError error="" />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
