import { getParamsFile } from '@/services/getParmsFile';
export default {
  namespace: 'paramsFile',
  state: {
    paramsFileList: [],
  },
  reducers: {
    getParmsFileList(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *getParamsFileListData({ payload, callback }, { call, put }) {
      const data = yield call(getParamsFile);
      callback(data);
      // console.log(data.data[0].list);
      yield put({
        type: 'getParmsFileList',
        payload: data.data[0],
      });
    },
  },
};
