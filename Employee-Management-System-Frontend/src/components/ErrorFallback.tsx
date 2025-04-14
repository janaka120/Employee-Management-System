import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

interface ErrorFallbackI {
  error?: Error | null;
}

const ErrorFallback = ({ error }: ErrorFallbackI) => {
  const navigate = useNavigate();

  return (
    <Result
      status="error"
      title="Oops! Something went wrong."
      subTitle={error?.message || "An unexpected error occurred."}
      extra={[
        <Button key="home" onClick={() => navigate("/")}>
          Go Home
        </Button>,
      ]}
    />
  );
};

export default ErrorFallback;
