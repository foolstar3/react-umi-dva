import { getFormData } from '@/services/getFormData';

export default {
  namespace: 'chart',
  state: {
    option: {},
    option2: {},
    option3: {},
  },
  reducers: {
    getFormData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *getData({ payload, callback }, { call, put }) {
      const data = yield call(getFormData);
      yield put({ type: 'getFormData', payload: data });
    },
  },
};
