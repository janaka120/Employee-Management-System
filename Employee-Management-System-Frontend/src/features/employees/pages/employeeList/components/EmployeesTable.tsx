import { Table, Space, Button, Tag, Popconfirm } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { EmployeeI } from "../../../employeeTypes";
import { useMemo } from "react";
import { Link } from "react-router-dom";

interface EmployeesTableI {
  list: EmployeeI[];
  deleteHandler: (id: string) => void;
}

const EmployeesTable = ({ list, deleteHandler }: EmployeesTableI) => {
  const columns: TableProps<EmployeeI>["columns"] = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <Space>
          {record.firstName} {record.lastName}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: EmployeeI["gender"]) => (
        <Tag
          color={
            gender === "Female"
              ? "pink"
              : gender === "Male"
              ? "blue"
              : "default"
          }
        >
          {gender}
        </Tag>
      ),
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Joined Date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/employee/edit/${record.uuid}`}>
            <Button
              type="link"
              icon={<EditOutlined />}
              aria-label={`Edit user ${record.firstName} ${record.lastName}`}
            >
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Delete user"
            description={`Are you sure you want to delete ${record.firstName} ${record.lastName}?`}
            onConfirm={() => deleteHandler(record.uuid)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              type="link"
              icon={<DeleteOutlined />}
              aria-label={`Delete user ${record.firstName} ${record.lastName}`}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const mappedData = useMemo(() => {
    return list.map((item) => {
      return { ...item, key: item.uuid };
    });
  }, [list]);

  return (
    <Table
      columns={columns}
      dataSource={mappedData}
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default EmployeesTable;
