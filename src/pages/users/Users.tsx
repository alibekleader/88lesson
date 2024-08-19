import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Table, Button, Modal, Form, Input } from 'antd';

const Users: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get('/users').then((response) => setUsers(response.data));
  }, []);

  const handleAdd = () => {
    form.validateFields().then((values) => {
      axios.post('/users', values).then(() => {
        setVisible(false);
        axios.get('/users').then((response) => setUsers(response.data));
      });
    });
  };

  const handleDelete = (id: number) => {
    axios.delete(`/users/${id}`).then(() => {
      axios.get('/users').then((response) => setUsers(response.data));
    });
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible
