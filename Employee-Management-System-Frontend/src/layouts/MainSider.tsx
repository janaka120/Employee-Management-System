import {
  HomeOutlined,
  LaptopOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import { PATHS } from "../constants/Paths";
import { useState } from "react";

const MainSider = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="md"
      collapsedWidth="80"
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
                label: <Link to={PATHS.ADD_EMPLOYEE_DETAIL}>Add Employee</Link>,
              },
            ],
          },
        ]}
      />
    </Sider>
  );
};

export default MainSider;
