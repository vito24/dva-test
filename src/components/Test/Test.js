/**
 * Created by vito on 2017/7/10.
 */
import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb, Form, Icon, Input, Button } from 'antd';

const { Content } = Layout;
const FormItem = Form.Item;

function Test({dispatch}) {
  return (
    <div>
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Test</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: '86vh' }}>
        <Form>

        </Form>
      </Content>
    </div>
  )
}

function mapStateToProps(state) {
  return state.test;
}

export default connect(mapStateToProps)(Test);

