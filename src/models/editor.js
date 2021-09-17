export default {
  namespace: 'editor',
  state: {
    codeEditorFlag: false,
  },
  reducers: {
    getCodeEditorFlag(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        ...payload,
      };
    },
    changeCodeEditorFlag(state, { payload }) {
      console.log(state);
      const newState = JSON.parse(JSON.stringify(state));
      newState.codeEditorFlag = true;
      console.log(newState);
      // console.log(newState);
      return newState;
    },
  },
  effects: {
    *getData({ payload, callback }, { call, put }) {
      // console.log({payload,callback});
      const data = yield call(getFormData);
      yield put({ type: 'getFormData', payload: data });
    },
  },
};
