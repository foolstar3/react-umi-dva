import { getTaskList } from '@/services/getTaskList';

export default {
    namespace: 'taskList',
    state: {
        list: [],
    },
    effects: {
        * getTaskList ({ payload }, { call, put }) {
            try {
                const res = yield call(getTaskList, { ...payload } )
                console.log('res',res.results)
                yield put({
                    type: 'updateTaskList',
                    payload: {
                        list: res.results
                    }
                })
            } catch (error) {
                console.error('...getProjectList result error', error)
            }
        },
        * addTaskList({payload},{call,put}){
           try {
                yield put({
                    type:'updateTaskList',
                    payload:{
                        list:payload.list,
                    }
               })
           } catch (error) {
                console.error('...getProjectList result error', error)
           }
        },
        * editSubmit({payload},{call,put}){
            try {
                console.log('payload_edit',payload.list)
                yield put({
                    type:'updateTaskList',
                    payload:{
                        list:payload.list
                    }
                })
            } catch (error) {

            }
        },
        * deleteTaskList({payload},{call,put}){
            try {
                yield put({
                    type:'updateTaskList',
                    payload:{
                        list:payload.list
                    }
                })
            } catch (error) {
                
            }
        }
    },
    reducers: {
        updateTaskList (state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}
