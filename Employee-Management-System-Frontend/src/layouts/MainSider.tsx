import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  HomeOutlined,
  LaptopOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { PATHS } from "../constants/Paths";
import TrackLink from "../components/TrackLink";

const MainSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["mail"]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === PATHS.ADD_EMPLOYEE_DETAIL) {
      setSelectedKeys([PATHS.ADD_EMPLOYEE_DETAIL]);
    } else {
      setSelectedKeys([PATHS.EMPLOYEE_LIST]);
    }
  }, [location.pathname]);

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
        selectedKeys={selectedKeys}
        items={[
          {
            key: "employee",
            icon: <LaptopOutlined />,
            label: "Employees",
            children: [
              {
                key: PATHS.EMPLOYEE_LIST,
                icon: <HomeOutlined />,
                label: (
                  <TrackLink to={PATHS.EMPLOYEE_LIST}>Employee List</TrackLink>
                ),
              },
              {
                key: PATHS.ADD_EMPLOYEE_DETAIL,
                icon: <PlusCircleOutlined />,
                label: (
                  <TrackLink to={PATHS.ADD_EMPLOYEE_DETAIL}>
                    Add Employee
                  </TrackLink>
                ),
              },
            ],
          },
        ]}
      />
    </Sider>
  );
};

export default MainSider;
