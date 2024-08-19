import React from "react";
import { Card, Form, Input, Button, Typography, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "./Login.css"; // CSS faylini import qilish

const { Title } = Typography;

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  return (
    <div className="login-container">
      <Card className="login-card" title="Login" bordered={false}>
        <Title level={3} className="login-title">Welcome Back</Title>
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              className="login-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="login-input"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Log In
            </Button>
          </Form.Item>
          <Divider />
          <Form.Item>
            <a href="/forgot-password">Forgot Password</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;