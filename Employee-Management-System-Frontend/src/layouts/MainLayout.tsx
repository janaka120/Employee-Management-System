import { Suspense } from "react";
import { Outlet, Link } from "react-router-dom";
import { PATHS } from "../constants/paths";
import { Layout, Menu, Avatar, Space, Typography } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import "./MainLayout.css";
import ErrorBoundary from "../components/ErrorBoundary";
import ErrorFallback from "../components/ErrorFallback";

const { Header, Content } = Layout;
const { Title } = Typography;

const menuItems = [
  { key: "/employees", label: <Link to={PATHS.EMPLOYEES}>Dashboard</Link> },
  {
    key: "/employee/add",
    label: <Link to={PATHS.ADD_EMPLOYEE_DETAIL}>People</Link>,
  },
];

const LoadingFallback = () => <div>Loading Page...</div>;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="main-header">
        <div className="logo">
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            EMS
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={["/employees", "/employee/add"]}
          items={menuItems}
          className="header-menu"
        />
        <Space className="header-right">
          <SettingOutlined
            style={{ color: "#fff", fontSize: "18px", cursor: "pointer" }}
          />
          <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Space>
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content className="main-content">
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Suspense fallback={<LoadingFallback />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
