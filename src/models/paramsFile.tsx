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
    *getParamsFileListData({ payload }, { call, put }) {
      const data = yield call(getParamsFile);
      // console.log(data.data[0].list);
      yield put({
        type: 'getParmsFileList',
        payload: data.data[0].paramsFileList,
      });
    },
  },
};
