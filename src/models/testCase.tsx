import { getCaseList, deleteCase, debugCase } from '@/services/testCase';

export default {
  namespace: 'testCase',
  state: {
    caseList: {},
    debugResponse: {},
  },
  reducers: {
    updateCaseList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.caseList = payload;
      return {
        ...state,
        ...newState,
      };
    },
    updateDebugResponse(state, { payload }) {
      // const newState = JSON.parse(JSON.stringify(state));
      // newState.debugResponse = payload;
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *getCaseList({ payload, callback }, { call, put }) {
      const res = yield call(getCaseList, payload);
      console.log(res);
      yield put({
        type: 'updateCaseList',
        payload: res,
      });
      if (callback) {
        callback();
      }
    },
    *deleteCase({ payload, callback }, { call, put }) {
      const res = yield call(deleteCase, payload);
      if (callback) {
        callback();
      }
    },
    *debugCase({ payload, callback }, { call, put }) {
      const res = yield call(debugCase, payload);
      yield put({
        type: 'updateDebugResponse',
        payload: { debugResponse: res },
      });
      if (callback) {
        callback();
      }
    },
  },
};
