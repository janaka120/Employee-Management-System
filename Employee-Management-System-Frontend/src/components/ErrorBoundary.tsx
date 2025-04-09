import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <DefaultErrorFallback
          onReset={this.handleReset}
          error={this.state.error}
        />
      );
    }

    return this.props.children;
  }
}

import { Result, Button, Typography } from "antd";

const { Paragraph, Text } = Typography;

interface DefaultFallbackProps {
  onReset?: () => void;
  error?: Error;
}

const DefaultErrorFallback: React.FC<DefaultFallbackProps> = ({
  onReset,
  error,
}) => (
  <Result
    status="error"
    title="Something went wrong"
    subTitle="Sorry, an unexpected error occurred."
    extra={
      onReset && (
        <Button type="primary" onClick={onReset}>
          Try Again
        </Button>
      )
    }
  >
    {error && (
      <div
        className="desc"
        style={{
          maxHeight: "150px",
          overflowY: "auto",
          textAlign: "left",
          background: "#fff2f0",
          padding: "10px",
          marginTop: "15px",
        }}
      >
        <Paragraph>
          <Text strong style={{ fontSize: 14 }}>
            Error Details:
          </Text>
        </Paragraph>
        <pre
          style={{
            fontSize: 12,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {error.message || "No error message available."}
        </pre>
        <pre
          style={{
            fontSize: 10,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            color: "#888",
          }}
        >
          {error.stack || "No stack trace available."}
        </pre>
      </div>
    )}
  </Result>
);

export default ErrorBoundary;
