import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import { getNavData } from './common/nav';
import { getPlainNode } from './utils/utils';

const getLayout = (navData, layout) => {
  if (!navData.some(item => item.layout === layout)) {
    return null;
  }
  const route = navData.filter(item => item.layout === layout)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
};

const getRouteData = (navData, layout) => {
  if (!navData.some(item => item.layout === layout)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === layout)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
};

const RouterConfig = ({ history, app }) => {
  const navData = getNavData(app);
  const MainLayout = getLayout(navData, 'MainLayout').component;
  const passProps = {
    app,
    navData,
    getRouteData: (layout) => {
      return getRouteData(navData, layout);
    },
  };

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" render={props => <MainLayout {...props} {...passProps} />} />
      </Switch>
    </Router>
  );
};

export default RouterConfig;
