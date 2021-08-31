import { getGlobalVarList } from '@/services/getGlobalVar';

export default {
    namespace: 'globalVarList',
    state: {
        list: [],
    },
    effects: {
        * getGlobalVarList ({ payload }, { call, put }) {
            try {
                const res = yield call(getGlobalVarList, { ...payload } )
                console.log('res',res.results)
                yield put({
                    type: 'updateGlobalVarList',
                    payload: {
                        list: res.results
                    }
                })
            } catch (error) {
                console.error('...getProjectList result error', error)
            }
        },
        * addGlobalVar({payload},{call,put}){
           try {
                yield put({
                    type:'updateGlobalVarList',
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
                    type:'updateGlobalVarList',
                    payload:{
                        list:payload.list
                    }
                })
            } catch (error) {

            }
        },
        * deleteGlobalVar({payload},{call,put}){
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
        updateGlobalVarList (state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}
