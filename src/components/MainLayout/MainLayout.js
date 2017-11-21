/**
 * Created by vito on 2017/7/4.
 */
import React, { Component } from 'react';
import { connect } from 'dva'
import { Layout, Menu, Icon } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import styles from './MainLayout.less';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

class MainLayout extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  onCollapse(collapsed) {
    this.changeLayoutCollapsed(collapsed);
  }

  toggle() {
    const { collapsed } = this.props.global;
    this.changeLayoutCollapsed(!collapsed);
    this.triggerResizeEvent();
  }

  changeLayoutCollapsed(collapsed) {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: {
        collapsed,
      },
    });
  }

  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const {
      children,
      location,
      global: {
        collapsed,
      },
    } = this.props;

    return (
      <Layout>
        <Sider
          className={styles.sider}
          width={256}
          trigger={null}
          breakpoint="md"
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse.bind(this)}
        >
          <div className={styles.logo}>
            <Link to="/">
              <img src="https://gw.alipayobjects.com/zos/rmsportal/iwWyPinUoseUxIAeElSx.svg" alt="logo" />
              <h1>VITO</h1>
            </Link>
          </div>
          <Menu
            style={{ margin: '16px 0', width: '100%' }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={['sub1']}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>subnav 1</span>
                </span>
              }
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
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  <span>subnav 2</span>
                </span>
              }
            >
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }

}

export default connect(state => ({
  global: state.global,
}))(MainLayout);
