import { requestUmi } from "@/utils/request";

export async function getDebugTalkList(data) {
    return requestUmi(`/qc/debugtalk/`,{
        method: 'GET',
        params: data
    })
}

export async function updateDebugTalkList(data) {
    return requestUmi(`/qc/debugtalk/${data.id}/`,{
        method: 'PUT',
        data,
        requestType: 'form'
    })
}