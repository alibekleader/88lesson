import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css';
import './App.css'; // Qo‘shimcha uslublar uchun import
import Sidebar from './components/Sidebar'; // Yana bir misol: yon panel uchun komponent
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Login from './pages/Login';

const { Content, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={256} className="site-layout-background">
          <Sidebar />
        </Sider>
        <Layout>
          <Content style={{ margin: '24px', padding: '24px', background: '#fff' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
