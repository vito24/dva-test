/**
 * Created by vito on 2017/7/4.
 */
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './MainLayout.css';
// import Header from './Header';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function MainLayout({ children, location }) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header">
        <div className={styles.logo} />
        <Menu
          selectedKeys={[location.pathname]}
          mode="horizontal"
          theme="dark"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="/">
            <Link to="/"><Icon type="home" />Home</Link>
          </Menu.Item>
          <Menu.Item key="/users">
            <Link to="/users"><Icon type="bars" />Users</Link>
          </Menu.Item>
          <Menu.Item key="/test">
            <Link to="/test"><Icon type="star" />Test</Link>
          </Menu.Item>
          <Menu.Item key="/404">
            <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
          </Menu.Item>
          <Menu.Item key="/antd">
            <a href="https://github.com/dvajs/dva" target="_blank" rel="noopener noreferrer">dva</a>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff', overflowX: 'hidden', overflowY: 'auto' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={['sub1']}
            style={{ height: '90vh', borderRight: 0 }}
          >
            <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
              <Menu.Item key="/">
                <Link to="/"><Icon type="home" />Home</Link>
              </Menu.Item>
              <Menu.Item key="/users">
                <Link to="/users"><Icon type="bars" />Users</Link>
              </Menu.Item>
              <Menu.Item key="/test">
                <Link to="/test"><Icon type="star" />Test</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
