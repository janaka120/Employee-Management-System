import { Result } from "antd";

const ErrorFallback: React.FC = () => (
  <Result
    status="warning"
    title="Page Error"
    subTitle="Failed to load this page section."
  />
);

export default ErrorFallback;
