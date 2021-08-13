import {
  getParamsFile,
  addFile,
  deleteFile,
  getParamsFileCode,
} from '@/services/getParmsFile';
export default {
  namespace: 'paramsFile',
  state: {
    paramsFileList: [],
    paramsFileCode: {},
  },
  reducers: {
    getParmsFileList(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        ...payload,
      };
    },
    setParamsFileCode(state, payload) {
      const newState = JSON.parse(JSON.stringify(state));
      console.log(payload);
      newState.paramsFileCode = payload.data[0];
      console.log(newState);
      return {
        ...state,
        ...newState,
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
    *addFile({ payload, callback }, { call, put }) {
      const data = yield call(addFile, payload);
      console.log(data);
      /*todo
      调用reducers中的更新函数
      更新state中的paramsFileList */
    },
    *deleteFile({ payload, callback }, { call, put }) {
      const data = yield call(deleteFile, payload);
      console.log(data);
      /*todo
      调用reducers中的更新函数
      更新state中的paramsFileList */
    },
    *getParamsFileCode({ payload, callback }, { call, put }) {
      const data = yield call(getParamsFileCode, payload);
      console.log(data);
      yield put({
        type: 'setParamsFileCode',
        data,
      });
    },
  },
};
