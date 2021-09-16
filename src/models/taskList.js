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
        callback(res);
      }
    },
    *addTaskList({ payload, callback }, { call, put }) {
      const res = yield call(addTaskList, { ...payload });
      yield put({
        type: 'updateTaskList',
      });
      if (callback) {
        callback(res);
      }
    },
    *editSubmit({ payload, callback }, { call, put }) {
      yield call(updateTaskList, { ...payload });
      if (callback) {
        callback(res);
      }
    },
    *deleteTaskList({ payload, callback }, { call, put }) {
      yield call(deleteTaskList, { ...payload });
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
