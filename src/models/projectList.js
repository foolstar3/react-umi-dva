import { 
    getProjectList,
    addProjectList,
    updateProjectList,
    deleteProjectList,
} from '@/services/getProjectList';

export default {
    namespace: 'projectList',
    state: {
        projectList: [],
    },
    effects: {
        * getProjectList ({ payload, callback }, { call, put }) {
            const res = yield call( getProjectList, { ...payload } )
            yield put({
                type: 'updateProjectList',
                payload: {
                    projectList: res.results
                }
            });
            if(callback){
                callback(res)
            }
             
        },
        * addProjectList({ payload, callback }, { call,put }) {
            const res = yield call(addProjectList, { ...payload } );
            yield put({
                type:'updateProjectList',
            });
            if(callback) {
                callback(res);
            }     
        },
        * editSubmit({ payload }, { call, put }){
            const res = yield call( updateProjectList, { ...payload } )
    },
        * deleteProjectList({ payload }, { call, put }){
            const res = yield call( deleteProjectList, { ...payload } )
        },
    },
    reducers: {
        updateProjectList (state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}
