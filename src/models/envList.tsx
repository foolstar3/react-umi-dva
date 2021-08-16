import { getEnvList, toggleSwitch } from '@/services/dataManage/envList';

export default {
  namespace: 'envList',
  state: {
    envList: [],
  },
  reducers: {
    update(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.envList = payload.results;
      return {
        ...state,
        ...newState,
      };
    },
    updateStatus(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.envList.map((item) => {
        if (item.id === payload.id) {
          item = payload;
        }
        return item;
      });
      return {
        ...state,
        ...newState,
      };
    },
  },
  effects: {
    *getEnvList({ payload, callback }, { call, put }) {
      const res = yield call(getEnvList, payload);
      yield put({
        type: 'update',
        payload: res,
      });
      if (callback) {
        callback();
      }
    },
    *toggleSwitch({ payload, callback }, { call, put }) {
      const res = yield call(toggleSwitch, payload);
      yield put({
        type: 'updateStatus',
        payload: res,
      });
      if (callback) {
        callback(res);
      }
    },
  },
};
