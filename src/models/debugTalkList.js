import { getDebugTalkList } from '@/services/getDebugTalk' 

export default {
    namespace: 'debugTalkList',
    state: {
        list: [],
    },

    effects: {
        * getDebugTalkList({ payload }, { call, put }) {
            try {
                const res = yield call( getDebugTalkList, { ...payload } )
                yield put({
                    type: 'updateDebugTalkList',
                    payload: {
                        list: res.results
                    }
                })
            } catch (error) {
                
            }
        },
        * editSubmit({ payload } ,{ call, put }) {
            try {
                yield put({
                    type:'updateGlobalVarList',
                    payload:{
                        list:payload.list
                    }
                })
            } catch (error) {

            }
        }
    },
    reducers: {
        updateDebugTalkList (state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }    
}