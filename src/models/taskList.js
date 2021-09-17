import {
  getTaskList,
  addTaskList,
  deleteTaskList,
  updateTaskList,
} from '@/services/getTaskList';

export default {
  namespace: 'taskList',
  state: {
    taskList: [],
  },
  effects: {
    *getTaskList({ payload, callback }, { call, put }) {
      const res = yield call(getTaskList, { ...payload });
      yield put({
        type: 'updateTaskList',
        payload: {
          taskList: res.results ?? res,
        },
      });
      if (callback) {
        callback(res.results ?? res, res.count);
      }
    },
    *addTaskList({ payload, callback }, { call, put }) {
      const res = yield call(addTaskList, { ...payload });
      if (callback) {
        callback();
      }
    },
    *editSubmit({ payload, callback }, { call, put }) {
      const res = yield call(updateTaskList, { ...payload });
      if (callback) {
        callback(res);
      }
    },
    *deleteTaskList({ payload, callback }, { call, put }) {
      const res = yield call(deleteTaskList, { ...payload });
      if (callback) {
        callback(res);
      }
    },
  },
  reducers: {
    updateTaskList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
