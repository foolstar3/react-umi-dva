import { getCaseList } from '@/services/testCase';

export default {
  namespace: 'testCase',
  state: {
    caseList: {},
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
  },
  effects: {
    *getCaseList({ payload, callback }, { call, put }) {
      const res = yield call(getCaseList, payload);
      // console.log(res);
      yield put({
        type: 'updateCaseList',
        payload: res,
      });
      if (callback) {
        callback();
      }
    },
  },
};