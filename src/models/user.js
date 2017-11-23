/**
 * Created by vito on 2017/11/24.
 */

import { queryCurrent } from '../services/users';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
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
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
};
