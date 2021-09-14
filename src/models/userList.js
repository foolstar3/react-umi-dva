import { getUserList, getUserName } from '@/services/getUserList';

export default {
  namespace: 'userList',
  state: {
    userList: [],
    user: {},
  },
  effects: {
    *getUserList({ payload, callback }, { call, put }) {
      const res = yield call(getUserList, { ...payload });
      yield put({
        type: 'updateUserList',
        payload: {
          userList: res,
        },
      });
      if (callback) {
        callback(res);
      }
    },
    *getUserName({ payload, callback }, { call, put }) {
      const res = yield call(getUserName, { ...payload });
      yield put({
        type: 'updateUserList',
        payload: {
          user: res,
        },
      });
      if (callback) {
        callback(res);
      }
    },
  },
  reducers: {
    updateUserList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
