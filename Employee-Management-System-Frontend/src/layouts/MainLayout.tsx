import { Suspense, useState } from "react";
import {
  LaptopOutlined,
  PlusCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import ErrorFallback from "../components/ErrorFallback";
import { PATHS } from "../constants/paths";
import "./MainLayout.css";

const { Header, Content, Sider } = Layout;

const LoadingFallback = () => <div>Loading Page...</div>;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md"
        collapsedWidth="80" // Adjust as needed
      >
        <div className="sider-header">EMS</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["employee-list"]}
          defaultOpenKeys={["employee"]}
          mode="inline"
          items={[
            {
              key: "employee",
              icon: <LaptopOutlined />,
              label: "Employees",
              children: [
                {
                  key: "employee-list",
                  icon: <HomeOutlined />,
                  label: <Link to={PATHS.EMPLOYEE_LIST}>Employee List</Link>,
                },
                {
                  key: "employee-add",
                  icon: <PlusCircleOutlined />,
                  label: (
                    <Link to={PATHS.ADD_EMPLOYEE_DETAIL}>Add Employee</Link>
                  ),
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="layout-header">
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["employee-list"]}
            style={{ flex: 1, minWidth: 0, lineHeight: "64px" }}
            items={[
              {
                key: "employee-list",
                icon: <HomeOutlined />,
                label: <Link to={PATHS.EMPLOYEE_LIST}>Home</Link>,
              },
            ]}
          />
        </Header>
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
              <Suspense fallback={<LoadingFallback />}>
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
