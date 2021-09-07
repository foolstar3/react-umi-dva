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
          moduleList: res.results,
        },
      });
      if (callback) {
        callback(res);
      }
    },

    *addModuleList({ payload, callback }, { call, put }) {
      yield call(addModuleList, { ...payload });
      if (callback) {
        callback();
      }
    },

    *editSubmit({ payload }, { call, put }) {
      yield call(updateModuleList, { ...payload });
      if (callback) {
        callback();
      }
    },

    *deleteModuleList({ payload }, { call, put }) {
      yield call(deleteModuleList, { ...payload });
      if (callback) {
        callback();
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
