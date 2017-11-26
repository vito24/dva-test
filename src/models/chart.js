/**
 * Created by vito on 2017/11/26.
 */

import { fakeChartData } from '../services/api';

export default {
  namespace: 'chart',

  state: {
    visitData: [],
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
};
