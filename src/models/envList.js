import {
  getEnvList,
  toggleSwitch,
  addEnvList,
  deleteEnvList,
  updateEnv,
} from '@/services/envList';

export default {
  namespace: 'envList',
  state: {
    envList: [],
  },
  reducers: {
    update(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.envList = payload;
      return {
        ...state,
        ...newState,
      };
    },
  },
  effects: {
    *getEnvList({ payload, callback }, { call, put }) {
      const res = yield call(getEnvList, payload);
      if (res.status && res.status !== 200) {
      } else {
        yield put({
          type: 'update',
          payload: res.results ?? res,
        });
        callback(res);
      }
    },
    *toggleSwitch({ payload, callback }, { call }) {
      const res = yield call(toggleSwitch, payload);
      if (callback) {
        callback(res);
      }
    },
    *addEnvList({ payload, callback }, { call }) {
      const res = yield call(addEnvList, payload);
      if (callback) {
        callback(res);
      }
    },
    *deleteEnvList({ payload, callback }, { call }) {
      const res = yield call(deleteEnvList, payload);
      callback(res);
    },
    *updateEnv({ payload, callback, failCB }, { call }) {
      const res = yield call(updateEnv, payload);
      if (res.code === 'U000000') {
        callback(res);
      } else {
        failCB(res);
      }
    },
  },
};
