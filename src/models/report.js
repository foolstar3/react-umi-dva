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
    reportDetail: {},
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
    update(state, { payload }) {
      console.log({
        ...state,
        ...payload,
      });
      return {
        ...state,
        ...payload,
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
