import {
  getModuleList,
  addModuleList,
  deleteModuleList,
  updateModuleList,
} from '@/services/getModuleList';

export default {
  namespace: 'moduleList',
  state: {
    moduleList: [],
  },
  effects: {
    *getModuleList({ payload, callback }, { call, put }) {
      const res = yield call(getModuleList, { ...payload });
      yield put({
        type: 'updateModuleList',
        payload: {
          moduleList: res.results ?? res,
        },
      });
      if (callback) {
        callback(res.results ?? res, res.count);
      }
    },

    *addModuleList({ payload, callback }, { call, put }) {
      const res = yield call(addModuleList, { ...payload });
      if (callback) {
        callback(res);
      }
    },

    *editModuleList({ payload, callback }, { call, put }) {
      const res = yield call(updateModuleList, { ...payload });
      if (res.code === 'U000000') {
        callback(res);
      }
    },

    *deleteModuleList({ payload, callback }, { call, put }) {
      const res = yield call(deleteModuleList, { ...payload });
      if (callback) {
        callback(res);
      }
    },
  },
  reducers: {
    updateModuleList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
