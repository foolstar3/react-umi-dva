import { get_dashboard_info } from '@/services/serviceAll';

export default {
  namespace: 'dashboard',
  state: {
    dashboardList: [],
  },
  effects: {
    *get_dashboard_info({ payload, callback }, { call, put }) {
      const res = yield call(get_dashboard_info, { ...payload });
      yield put({
        type: 'updateDashboardList',
        payload: {
          dashboardList: res,
        },
      });
      if (callback) {
        callback(res);
      }
    },
  },
  reducers: {
    updateDashboardList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
