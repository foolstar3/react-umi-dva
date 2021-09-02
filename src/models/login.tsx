import { login } from '@/services/login';

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
      // console.log(payload);
      const res = yield call(login, payload);
      if (res.user) {
        localStorage.setItem('qc_user', res.user.username);
        // console.log(localStorage.getItem('qc_user'));
      }
      yield put({
        type: 'userLogin',
        payload: res,
      });
      if (callback) {
        callback();
      }
    },
  },
};
