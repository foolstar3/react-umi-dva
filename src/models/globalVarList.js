import { getGlobalVarList,
         addGlobalVarList,
         deleteGlobalVarList,
         updateGlobalVarList 
} from '@/services/getGlobalVar';

export default {
    namespace: 'globalVarList',
    state: {
        globalVarList: [],
    },
    effects: {
        * getGlobalVarList ({ payload, callback }, { call, put }) {
            const res = yield call( getGlobalVarList, { ...payload } )
            yield put({
                type: 'updateGlobalVarList',
                payload: {
                    globalVarList: res.results
                }
            });
            if(callback){
                callback(res)
            }
        },
        * addGlobalVarList({ payload, callback }, { call, put }) {
            const res = yield call( addGlobalVarList, { ...payload } );
            yield put({
                type:'updateGlobalVarList',
            });
            if(callback){
                callback(res)
            }
        },
        * editSubmit({ payload }, { call, put}){
            const res = yield call( updateGlobalVarList, { ...payload } )
        },
        * deleteGlobalVarList({ payload }, { call, put}){
            const res = yield call( deleteGlobalVarList, { ...payload } )
        }
    },
    reducers: {
        updateGlobalVarList (state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}
