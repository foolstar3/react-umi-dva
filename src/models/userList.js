import { getUserList } from '@/services/getUserList';

export default {
  namespace: 'userList',
  state: {
    userList: [],
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
