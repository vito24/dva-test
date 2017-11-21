import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb } from 'antd';
import styles from './IndexPage.less';

const { Content } = Layout;

function IndexPage({ location }) {
  return (
    <div>
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: '86vh' }} className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>
            <a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a>
          </li>
        </ul>
      </Content>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
