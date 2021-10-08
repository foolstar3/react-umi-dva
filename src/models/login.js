import { login, logout } from '@/services/login';

export default {
  namespace: 'login',
  state: {
    loginInfo: {},
  },
  reducers: {
    userLogin(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loginInfo = payload;
      return {
        ...state,
        ...newState,
      };
    },
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      const res = yield call(login, payload);
      if (res.user) {
        localStorage.setItem('qc_user', res.user.username);
        localStorage.setItem('qc_token', res.authorization);
      }
      yield put({
        type: 'userLogin',
        payload: res,
      });
      if (callback) {
        callback();
      }
    },
    *logout({ payload, callback }, { call, put }) {
      const res = yield call(logout, payload);
      callback ? callback(res) : null;
    },
  },
};
