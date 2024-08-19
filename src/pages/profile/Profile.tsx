import React, { useState } from 'react';
import { Card, Avatar, Button, Modal, Form, Input, Typography } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import './Profile.css'; // CSS faylni import qilish

const { Title } = Typography;

const Profile: React.FC = () => {
  // Foydalanuvchi ma'lumotlari
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software Developer',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showEditModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = (values: any) => {
    setUser({
      ...user,
      ...values,
    });
    setIsModalVisible(false);
  };

  return (
    <div className="profile-container">
      <Card
        style={{ width: 300, margin: 'auto', textAlign: 'center' }}
        cover={<img alt="example" src="https://via.placeholder.com/300x200" />}
        actions={[
          <Button type="primary" icon={<EditOutlined />} onClick={showEditModal}>
            Edit Profile
          </Button>,
        ]}
      >
        <Avatar size={100} icon={<UserOutlined />} />
        <Title level={3} style={{ marginTop: 16 }}>
          {user.name}
        </Title>
        <p>{user.email}</p>
        <p>{user.bio}</p>
      </Card>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          initialValues={user}
          onFinish={handleOk}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bio"
            label="Bio"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
