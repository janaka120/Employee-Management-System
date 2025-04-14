import { HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { PATHS } from "../constants/Paths";
import "./styles/MainHeader.css";

const MainHeader = () => {
  return (
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
  );
};

export default MainHeader;
