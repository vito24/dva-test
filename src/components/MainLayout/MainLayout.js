/**
 * Created by vito on 2017/7/4.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, Route, Switch, Redirect } from 'dva/router';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import classNames from 'classnames';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import HeaderSearch from '../HeaderSearch';
import styles from './MainLayout.less';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.menus = props.navData.reduce((arr, current) => arr.concat(current.children), []);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  onCollapse(collapsed) {
    // 收缩侧边栏
    this.changeLayoutCollapsed(collapsed);
  }

  onMenuClick({ key }) {
    if (key === 'logout') {
      // TODO
    }
  }

  getNavMenuItems(menusData, parentPath = '') {
    // 渲染侧边栏
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

  getDefaultCollapsedSubMenus(props) {
    // 渲染当前展开的菜单
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
    currentMenuSelectedKeys.splice(-1, 1);
    if (currentMenuSelectedKeys.length === 0) {
      return ['dashboard'];
    }
    return currentMenuSelectedKeys;
  }

  getCurrentMenuSelectedKeys(props) {
    // 渲染当前选中的菜单
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].key];
    }
    return keys;
  }

  getPageTitle() {
    // 设置页面title
    const { location: { pathname }, getRouteData } = this.props;
    let title = '';
    getRouteData('MainLayout').forEach((item) => {
      if (item.path === pathname) {
        title = item.name;
      }
    });
    return title;
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
      user: {
        currentUser: {
          name,
          avatar,
        },
      },
      getRouteData,
    } = this.props;

    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : {
      openKeys: this.state.openKeys,
    };

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );

    const layout = (
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
            {...menuProps}
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
            <div className={styles.right}>
              <HeaderSearch
                className={`${styles.action} ${styles.search}`}
                placeholder="站内搜索"
                dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                onSearch={(value) => {
                  console.log('input', value); // eslint-disable-line
                }}
                onPressEnter={(value) => {
                  console.log('enter', value); // eslint-disable-line
                }}
              />
              <Dropdown overlay={menu}>
                  <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={avatar} />
                    { name }
                  </span>
              </Dropdown>
            </div>
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
              <Redirect exact from="/" to="/dashboard/analysis" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {
            params => <div className={classNames(params)}>{ layout }</div>
          }
        </ContainerQuery>
      </DocumentTitle>
    );
  }

}

export default connect(state => ({
  global: state.global,
  user: state.user,
}))(MainLayout);
