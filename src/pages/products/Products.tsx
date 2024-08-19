import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Table, Button, Modal, Form, Input } from 'antd';

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get('/products').then((response) => setProducts(response.data));
  }, []);

  const handleAdd = () => {
    form.validateFields().then((values) => {
      axios.post('/products', values).then(() => {
        setVisible(false);
        axios.get('/products').then((response) => setProducts(response.data));
      });
    });
  };

  const handleDelete = (id: number) => {
    axios.delete(`/products/${id}`).then(() => {
      axios.get('/products').then((response) => setProducts(response.data));
    });
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add Product
      </Button>
      <Table
        dataSource={products}
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Price', dataIndex: 'price', key: 'price' },
          {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
              <Button onClick={() => handleDelete(record.id)}>Delete</Button>
            ),
          },
        ]}
      />
      <Modal
        visible={visible}
        title="Add Product"
        onCancel={() => setVisible(false)}
        onOk={handleAdd}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
