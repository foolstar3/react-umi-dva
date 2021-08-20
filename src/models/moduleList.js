import { getModuleList } from '@/services/getModuleList';

export default {
    namespace: 'moduleList',
    state: {
        list: [],
        addVisible:false,
        editVisible:false,
        value:''
    },
    effects: {
        * getModuleList ({ payload }, { call, put }) {
            try {
                const res = yield call(getModuleList, { ...payload } )
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
                        addVisible:payload.addVisible
                    }
               })
           } catch (error) {
                console.error('...getProjectList result error', error)
           }
        },
        * editModal({payload},{call,put}){
            try {
                yield put({
                    type:'updateModuleList',
                    payload:{
                        editVisible:payload.editVisible,
                        value:payload.value
                    }
                })
            } catch (error) {
                
            }
        },
        * editSubmit({payload},{call,put}){
            try {
                console.log('payload_edit',payload.list)
                yield put({
                    type:'updateModuleList',
                    payload:{
                        editVisible:payload.editVisible,
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
        },
        * showAddModal({payload},{call,put}){
            try {
                yield put({
                    type:'updateModuleList',
                    payload:{
                        addVisible:payload.addVisible
                    }
                })
            } catch (error) {
                console.error('...getProjectList result error', error)
            }
        },
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
