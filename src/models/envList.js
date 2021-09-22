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
    addEnvListData(state, { payload }) {
      return {
        ...state,
      };
    },
  },
  effects: {
    *getEnvList({ payload, callback }, { call, put }) {
      const res = yield call(getEnvList, payload);
      yield put({
        type: 'update',
        payload: res.results ?? res,
      });
      if (callback) {
        callback(res);
      }
    },
    *toggleSwitch({ payload, callback }, { call, put }) {
      const res = yield call(toggleSwitch, payload);
      if (callback) {
        callback(res);
      }
    },
    *addEnvList({ payload, callback }, { call, put }) {
      const res = yield call(addEnvList, payload);
      yield put({
        type: 'addEnvListData',
      });
      if (callback) {
        callback(res);
      }
    },
    *deleteEnvList({ payload, callback }, { call, put }) {
      const res = yield call(deleteEnvList, payload);
      callback();
    },
    *updateEnv({ payload, callback }, { call, put }) {
      const res = yield call(updateEnv, payload);
      if (res.code === 'U000000') {
        callback(res);
      }
    },
  },
};
