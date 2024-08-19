import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import Products from './pages/products';
import Login from './pages/login';

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
