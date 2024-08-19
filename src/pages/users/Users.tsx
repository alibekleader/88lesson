// pages/Users.tsx
import React from "react";
import { Table, Tag, Space, Button, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

// Misol uchun foydalanuvchilar ma'lumotlari
const users = [
  { key: '1', name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
  { key: '2', name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Inactive' },
  { key: '3', name: 'Michael Johnson', email: 'michael.johnson@example.com', status: 'Active' },
  { key: '4', name: 'Emily Davis', email: 'emily.davis@example.com', status: 'Pending' },
];

const Users: React.FC = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'geekblue';
        if (status === 'Active') {
          color = 'green';
        } else if (status === 'Inactive') {
          color = 'volcano';
        } else if (status === 'Pending') {
          color = 'orange';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <h1
        style={{ marginBottom: "24px", fontSize: "24px", fontWeight: "bold" }}
      >
        Users
      </h1>
      <Card style={{ backgroundColor: "#fff" }}>
        <Table columns={columns} dataSource={users} />
      </Card>
    </div>
  );
};

export default Users;