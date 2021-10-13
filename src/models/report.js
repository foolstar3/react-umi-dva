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
    *getReportDetail({ payload, callback, failCB }, { call, put }) {
      const { success, data, message } = parseResponse(
        yield call(getReportDetail, payload),
      );
      if (success) {
        yield put({
          type: 'update',
          payload: { reportDetail: { summary: data } },
        });
        callback(data);
      } else {
        failCB(message);
      }
    },
  },
};
