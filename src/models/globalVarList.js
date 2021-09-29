import {
  getGlobalVarList,
  addGlobalVarList,
  deleteGlobalVarList,
  updateGlobalVarList,
} from '@/services/getGlobalVar';

export default {
  namespace: 'globalVarList',
  state: {
    globalVarList: [],
  },
  effects: {
    *getGlobalVarList({ payload, callback }, { call, put }) {
      const res = yield call(getGlobalVarList, { ...payload });
      yield put({
        type: 'updateGlobalVarList',
        payload: {
          globalVarList: res.results ?? res,
        },
      });
      if (callback) {
        callback(res);
      }
    },
    *addGlobalVarList({ payload, callback }, { call, put }) {
      const res = yield call(addGlobalVarList, { ...payload });
      if (callback) {
        callback(res);
      }
    },
    *editGlobalVarList({ payload, callback }, { call, put }) {
      const res = yield call(updateGlobalVarList, { ...payload });
      if (res.code === 'U000000') {
        callback(res);
      }
    },
    *deleteGlobalVarList({ payload, callback }, { call, put }) {
      const res = yield call(deleteGlobalVarList, { ...payload });
      if (callback) {
        callback(res);
      }
    },
  },
  reducers: {
    updateGlobalVarList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
