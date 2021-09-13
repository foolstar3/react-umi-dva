import {
  getProjectList,
  addProjectList,
  updateProjectList,
  deleteProjectList,
  getUserList,
} from '@/services/getProjectList';

export default {
  namespace: 'projectList',
  state: {
    projectList: [],
  },
  effects: {
    *getProjectList({ payload, callback }, { call, put }) {
      const res = yield call(getProjectList, { ...payload });
      yield put({
        type: 'updateProjectList',
        payload: {
          projectList: res.results,
        },
      });
      if (callback) {
        callback(res);
      }
    },
    *addProjectList({ payload, callback }, { call, put }) {
      const res = yield call(addProjectList, { ...payload });
      if (callback) {
        callback(res);
      }
    },
    *editProjectList({ payload, callback }, { call, put }) {
      yield call(updateProjectList, { ...payload });
      if (callback) {
        callback();
      }
    },
    *deleteProjectList({ payload, callback }, { call, put }) {
      yield call(deleteProjectList, { ...payload });
      if (callback) {
        callback();
      }
    },
  },
  reducers: {
    updateProjectList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
