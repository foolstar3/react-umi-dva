import { 
    getModuleList,
    addModuleList,
    deleteModuleList,
    updateModuleList
 } from '@/services/getModuleList';

export default {
    namespace: 'moduleList',
    state: {
        list: [],
    },
    effects: {
        * getModuleList ({ payload, callback }, { call, put }) {
            const res = yield call( getModuleList, { ...payload } )
            yield put({
                type: 'updateModuleList',
                payload: {
                    list: res.results
                }
            });
            if(callback){
                callback(res)
            }
        },
        * addModuleList({ payload, callback }, { call, put }){
            const res = yield call( addModuleList, { ...payload } );
            yield put({
                type:'updateModuleList',
            });
            if(callback){
                callback(res)
            }
        },

        * editSubmit({ payload },{ call, put }){
            const res = yield call( updateModuleList, { ...payload } )
        },

        * deleteModuleList({ payload }, { call, put }){
            const res = yield call( deleteModuleList, { ...payload } )
        }
    },
    reducers: {
        updateModuleList (state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}
