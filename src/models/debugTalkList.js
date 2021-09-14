import { getDebugTalkList, updateDebugTalkList } from '@/services/getDebugTalk';

export default {
  namespace: 'debugTalkList',
  state: {
    debugTalkList: [],
  },

  effects: {
    *getDebugTalkList({ payload, callback }, { call, put }) {
      const res = yield call(getDebugTalkList, { ...payload });
      yield put({
        type: 'updateDebugTalkList',
        payload: {
          debugTalkList: res.results ?? res,
        },
      });
      if (callback) {
        callback(res);
      }
    },
    *editSubmit({ payload }, { call, put }) {
      const res = yield call(updatedDebugTalkList, payload);
    },
  },
  reducers: {
    updateDebugTalkList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
