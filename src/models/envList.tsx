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
      console.log(payload);
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
      // console.log(res);
    },
    *updateEnv({ payload, callback }, { call, put }) {
      const res = yield call(updateEnv, payload);
      console.log(res);
    },
  },
};
