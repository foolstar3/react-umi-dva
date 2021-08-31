import { getProjectList } from '@/services/getProjectList';

export default {
    namespace: 'projectList',
    state: {
        list: [],
        addVisible:false,
        editVisible:false,
        value:''
    },
    effects: {
        * getProjectList ({ payload }, { call, put }) {
            try {
                const res = yield call(getProjectList, { ...payload } )
                yield put({
                    type: 'updateProjectList',
                    payload: {
                        list: res.results
                    }
                })
            } catch (error) {
                console.error('...getProjectList result error', error)
            }
        },
        * addProjectList({payload},{call,put}){
           try {
                yield put({
                    type:'updateProjectList',
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
                    type:'updateProjectList',
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
                    type:'updateProjectList',
                    payload:{
                        editVisible:payload.editVisible,
                        list:payload.list
                    }
                })
            } catch (error) {

            }
        },
        * deleteProjectList({payload},{call,put}){
            try {
                yield put({
                    type:'updateProjectList',
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
                    type:'updateProjectList',
                    payload:{
                        addVisible:payload.addVisible
                    }
                })
            } catch (error) {
                console.error('...getProjectList result error', error)
            }
        }
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
