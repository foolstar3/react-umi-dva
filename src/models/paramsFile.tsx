import {
  getParamsFile,
  addFile,
  deleteFile,
  getParamsFileCode,
  updateParamsFileCode,
} from '@/services/getParmsFile';
export default {
  namespace: 'paramsFile',
  state: {
    paramsFileList: [],
    paramsFileCode: {},
  },
  reducers: {
    getParmsFileList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.paramsFileList = payload;
      return {
        ...state,
        ...newState,
      };
    },
    setParamsFileCode(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.paramsFileCode = payload;
      // console.log(newState);
      return {
        ...state,
        ...newState,
      };
    },
    setEditorCode(state, { payload }) {
      // console.log(payload);
      const newState = JSON.parse(JSON.stringify(state));
      newState.paramsFileCode.context = payload;
      return {
        ...state,
        ...newState,
      };
    },
  },
  effects: {
    *getParamsFileListData({ payload, callback }, { call, put }) {
      const data = yield call(getParamsFile, payload);
      // console.log(data);
      yield put({
        type: 'getParmsFileList',
        payload: data,
      });
      if (callback) {
        callback();
      }
    },
    *addFile({ payload, callback }, { call, put }) {
      const data = yield call(addFile, payload);
      /*todo
      调用reducers中的更新函数
      更新state中的paramsFileList */
      if (callback) {
        callback();
      }
    },
    *deleteFile({ payload, callback }, { call, put }) {
      const data = yield call(deleteFile, payload);
      /*todo
      调用reducers中的更新函数
      更新state中的paramsFileList */
      if (callback) {
        callback();
      }
    },
    *getParamsFileCode({ payload, callback }, { call, put }) {
      const data = yield call(getParamsFileCode, payload);
      yield put({
        type: 'setParamsFileCode',
        payload: data,
      });
    },
    *updateParamsFileCode({ payload, callback }, { call, put }) {
      const res = yield call(updateParamsFileCode, payload);
      // console.log(res);
    },
  },
};
