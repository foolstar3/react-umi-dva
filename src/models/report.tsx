import { getReportList, deleteReport } from '@/services/report';

export default {
  namespace: 'report',
  state: {
    reportList: {},
  },
  reducers: {
    reportList(state: any, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.reportList = payload;
      return {
        ...state,
        ...newState,
      };
    },
  },
  effects: {
    *getReportList({ payload, callback }, { call, put }) {
      const res = yield call(getReportList, payload);
      console.log(res);
      yield put({
        type: 'reportList',
        payload: res,
      });
      if (callback) {
        callback();
      }
    },
    *deleteReport({ payload, callback }, { call, put }) {
      console.log(payload);
      const res = yield call(deleteReport, payload);
      // yield put({
      //   type: 'delete',
      //   payload: res,
      // })
      if (callback) {
        callback();
      }
    },
  },
};
