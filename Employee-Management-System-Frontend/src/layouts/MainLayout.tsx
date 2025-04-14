import { Suspense } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import ErrorFallback from "../components/ErrorFallback";
import MainSider from "./MainSider";
import MainHeader from "./MainHeader";
import LoadingIndicator from "../components/LoadingIndicator";
import "./styles/MainLayout.css";

const { Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <MainSider />
      <Layout className="site-layout">
        <MainHeader />
        <Content className="layout-content">
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Suspense fallback={<LoadingIndicator />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
