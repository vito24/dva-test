/**
 * Created by vito on 2017/11/21.
 * 侧边栏
 */

import dynamic from 'dva/dynamic';

const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component: () => component,
});

export const getNavData = app => [{
  component: dynamicWrapper(app, ['user'], import('../components/MainLayout/MainLayout')),
  layout: 'MainLayout',
  name: '首页', // for breadcrumb
  path: '/',
  children: [{
    name: 'Dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [{
      name: 'IndexPage',
      path: 'index',
      component: dynamicWrapper(app, [], import('../routes/Dashboard/IndexPage')),
    }, {
      name: 'Test',
      path: 'test',
      component: dynamicWrapper(app, ['test'], import('../routes/Dashboard/Test')),
    }],
  }],
}];
