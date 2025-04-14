import { Spin } from "antd";
import "./styles/LoadingIndicator.css";

interface LoadingIndicatorI {
  text?: string;
}
const LoadingIndicator = ({ text }: LoadingIndicatorI) => (
  <div className="loader-container">
    <Spin size="large" />
    {text && <div style={{ marginTop: 16 }}>{text}</div>}
  </div>
);

export default LoadingIndicator;
