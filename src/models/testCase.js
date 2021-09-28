import {
  getCaseList,
  deleteCase,
  debugCase,
  getFuncs,
  getCalls,
  updateCase,
  createCase,
  copyCase,
} from '@/services/testCase';

export default {
  namespace: 'testCase',
  state: {
    caseList: {},
    debugResponse: {},
    funcsName: [],
    callCase: {},
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
      return {
        ...state,
        ...payload,
      };
    },
    removeCalls(state) {
      return {
        ...state,
        callCase: {},
      };
    },
  },
  effects: {
    *getCaseList({ payload, callback }, { call, put }) {
      const res = yield call(getCaseList, payload);
      yield put({
        type: 'updateCaseList',
        payload: res,
      });
      if (callback) {
        callback(res);
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
        callback(res);
      }
    },
    *getFuncs({ payload, callback }, { call, put }) {
      const res = yield call(getFuncs, payload);
      let funcs = [];
      Object.keys(res).forEach((key) => (funcs = res[key].concat(funcs)));
      yield put({
        type: 'updateDebugResponse',
        payload: { funcsName: funcs },
      });
      callback();
    },
    *getCalls({ payload }, { call, put }) {
      const res = yield call(getCalls, payload);
      yield put({
        type: 'updateDebugResponse',
        payload: { callCase: res },
      });
    },
    *updateCase({ payload, callback }, { call }) {
      const res = yield call(updateCase, payload);
      if (callback) {
        callback(res);
      }
    },
    *createCase({ payload, callback }, { call }) {
      const res = yield call(createCase, payload);
      if (callback) {
        callback(res);
      }
    },
    *copyCase({ payload, callback }, { call }) {
      const res = yield call(copyCase, payload);
      if (callback) {
        callback(res);
      }
    },
  },
};
