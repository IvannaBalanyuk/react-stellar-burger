import { Component, ErrorInfo, ReactNode } from "react";
import AppError from "../app-error/app-error";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Возникла ошибка", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <AppError error="" />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
