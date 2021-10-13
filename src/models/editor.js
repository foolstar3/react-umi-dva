export default {
  namespace: 'editor',
  state: {
    codeEditorFlag: false,
  },
  reducers: {
    getCodeEditorFlag(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeCodeEditorFlag(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.codeEditorFlag = true;
      return newState;
    },
  },
  effects: {
    *getData({ payload, callback }, { call, put }) {
      const data = yield call(getFormData);
      yield put({ type: 'getFormData', payload: data });
    },
  },
};
