/**
 * Created by vito on 2017/11/20.
 */

export default {
  namespace: 'global',

  state: {
    collapsed: false, // 侧边菜单是否折叠
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  effects: {

  },

  subscriptions: {

  },
};
