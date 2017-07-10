import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Layout, Breadcrumb } from 'antd';
import { routerRedux } from 'dva/router';

import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';

const { Content } = Layout;

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  // 删除
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  // 编辑
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  // 新增
  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  // 分页
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="确定删除?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>User</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: '86vh' }}>
        <div>
          <div className={styles.create}>
            <UserModal record={{}} onOk={createHandler}>
              <Button type="primary">Create User</Button>
            </UserModal>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey={record => record.id}
            pagination={false}
            loading={loading}
          />
          <Pagination
            className="ant-table-pagination"
            total={total}
            current={current}
            pageSize={PAGE_SIZE}
            onChange={pageChangeHandler}
          />
        </div>
      </Content>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Users);
