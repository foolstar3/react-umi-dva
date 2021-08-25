import { getModuleList } from '@/services/getModuleList';

export default {
    namespace: 'moduleList',
    state: {
        list: [],
    },
    effects: {
        * getModuleList ({ payload }, { call, put }) {
            try {
                const res = yield call(getModuleList, { ...payload } )
                console.log('res',res.results)
                yield put({
                    type: 'updateModuleList',
                    payload: {
                        list: res.results
                    }
                })
            } catch (error) {
                console.error('...getProjectList result error', error)
            }
        },
        * addModuleList({payload},{call,put}){
           try {
                yield put({
                    type:'updateModuleList',
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
                    type:'updateModuleList',
                    payload:{
                        list:payload.list
                    }
                })
            } catch (error) {

            }
        },
        * deleteModuleList({payload},{call,put}){
            try {
                yield put({
                    type:'updateModuleList',
                    payload:{
                        list:payload.list
                    }
                })
            } catch (error) {
                
            }
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
