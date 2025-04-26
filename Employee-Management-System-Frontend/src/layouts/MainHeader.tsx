import { HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { PATHS } from "../constants/Paths";
import "./styles/MainHeader.css";
import TrackLink from "../components/TrackLink";

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
            label: <TrackLink to={PATHS.EMPLOYEE_LIST}>Home</TrackLink>,
          },
        ]}
      />
    </Header>
  );
};

export default MainHeader;
