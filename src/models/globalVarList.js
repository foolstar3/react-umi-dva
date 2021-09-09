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
          globalVarList: res.results,
        },
      });
      if (callback) {
        callback(res);
      }
    },
    *addGlobalVarList({ payload, callback }, { call, put }) {
      yield call(addGlobalVarList, { ...payload });
      if (callback) {
        callback();
      }
    },
    *editGlobalVarList({ payload, callback }, { call, put }) {
      yield call(updateGlobalVarList, { ...payload });
      if (callback) {
        callback();
      }
    },
    *deleteGlobalVarList({ payload }, { call, put }) {
      yield call(deleteGlobalVarList, { ...payload });
      if (callback) {
        callback();
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
