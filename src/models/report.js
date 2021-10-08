import {
  getReportList,
  deleteReport,
  getReportDetail,
} from '@/services/report';
import { parseResponse } from '@/utils/common';

export default {
  namespace: 'report',
  state: {
    reportList: {},
  },
  reducers: {
    reportList(state, { payload }) {
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
      yield put({
        type: 'reportList',
        payload: res,
      });
      if (callback) {
        callback();
      }
    },
    *deleteReport({ payload, callback }, { call }) {
      const res = yield call(deleteReport, payload);
      if (callback) {
        callback();
      }
    },
    *getReportDetail({ payload, callback }, { call, put }) {
      const { success, data } = parseResponse(
        yield call(getReportDetail, payload),
      );
      if (success) {
        callback(data);
      }
    },
  },
};
