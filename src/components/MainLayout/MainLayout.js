/**
 * Created by vito on 2017/7/4.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, Route, Switch, Redirect } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import styles from './MainLayout.less';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.menus = props.navData.reduce((arr, current) => arr.concat(current.children), []);
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  onCollapse(collapsed) {
    this.changeLayoutCollapsed(collapsed);
  }

  getNavMenuItems(menusData, parentPath = '') {
    if (!menusData) {
      return [];
    }
    return menusData.map((item) => {
      if (!item.name) {
        return null;
      }
      let itemPath = '';
      if (item.path.indexOf('http') === 0) {
        itemPath = item.path;
      } else {
        itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{ item.name }</span>
                </span>
              ) : item.name
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      const icon = item.icon && <Icon type={item.icon} />;
      return (
        <Menu.Item key={item.key || item.path}>
          {
            /^https?:\/\//.test(itemPath) ? (
              <a href={itemPath} target={item.target}>
                {icon}<span>{ item.name }</span>
              </a>
            ) : (
              <Link
                to={itemPath}
                target={item.target}
                replace={itemPath === this.props.location.pathname}
              >
                {icon}<span>{ item.name }</span>
              </Link>
            )
          }
        </Menu.Item>
      );
    });
  }

  getCurrentMenuSelectedKeys(props) {
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].key];
    }
    return keys;
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
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const {
      global: {
        collapsed,
      },
      getRouteData,
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
            selectedKeys={this.getCurrentMenuSelectedKeys()}
          >
            {this.getNavMenuItems(this.menus)}
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
            <Switch>
              {
                getRouteData('MainLayout').map(item => (
                  <Route
                    exact={item.exact}
                    key={item.path}
                    path={item.path}
                    component={item.component}
                  />
                ))
              }
              <Redirect exact from="/" to="/dashboard/index" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }

}

export default connect(state => ({
  global: state.global,
}))(MainLayout);
