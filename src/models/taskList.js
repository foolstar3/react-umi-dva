import { 
    getTaskList,
    addTaskList,
    deleteTaskList,
    updateTaskList 
} from '@/services/getTaskList';

export default {
    namespace: 'taskList',
    state: {
        taskList: [],
    },
    effects: {
        * getTaskList ({ payload, callback }, { call, put }) {
            const res = yield call( getTaskList, { ...payload } )
            yield put({
                type: 'updateTaskList',
                payload: {
                    taskList: res.results
                }
            });
            if(callback){
                callback(res)
            }
        },
        * addTaskList({ payload, callback }, { call, put }){
            const res = yield call( addTaskList, { ...payload } );
            yield put({
                type:'updateTaskList',
            });
            if( callback ){
                callback( res )
            }
        },
        * editSubmit( { payload }, { call, put }){
            const res = yield call( updateTaskList, { ...payload } )
        },
        * deleteTaskList({ payload },{ call, put }){
            const res = yield call( deleteTaskList, { ...payload } )
        },
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
